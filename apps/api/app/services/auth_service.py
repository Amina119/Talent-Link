from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.profile import Profile
from app.core.security import hash_password, verify_password, create_access_token
from app.services.audit_service import log

def _jwt_payload(user: User) -> dict:
    perms = [up.permission_code for up in user.permissions]
    return {"sub": str(user.id), "role": user.role, "perms": perms}

def register(db: Session, email: str, full_name: str, password: str) -> str:
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(email=email, full_name=full_name, password_hash=hash_password(password), role="user")
    db.add(user)
    db.flush()

    db.add(Profile(user_id=user.id))
    db.commit()
    log(db, user.id, "REGISTER", "USER", str(user.id), {"email": email})

    return create_access_token(_jwt_payload(user))

def login(db: Session, email: str, password: str) -> str:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        log(db, None, "LOGIN_FAILED", "USER", email, {"email": email})
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="User suspended")

    log(db, user.id, "LOGIN_SUCCESS", "USER", str(user.id), {})
    return create_access_token(_jwt_payload(user))