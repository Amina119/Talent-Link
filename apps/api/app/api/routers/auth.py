from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_db, get_current_user
from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User
from app.schemas.auth import RegisterIn, LoginIn, AuthOut, AuthUserOut

router = APIRouter(prefix="/auth", tags=["auth"])

def build_user_out(user: User) -> AuthUserOut:

    perms = []
    if user.role == "admin":
        perms = ["admin:users", "admin:audit"]
    return AuthUserOut(
        id=str(user.id),
        email=user.email,
        role=user.role,
        permissions=perms,
    )

@router.post("/register", response_model=AuthOut)
def register(payload: RegisterIn, db: Session = Depends(get_db)):
    email = payload.email.lower().strip()

    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(
        email=email,
        password_hash=hash_password(payload.password),
        full_name=payload.full_name,
        role="member",
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(sub=str(user.id))
    return AuthOut(access_token=token, user=build_user_out(user))

@router.post("/login", response_model=AuthOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    email = payload.email.lower().strip()
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account suspended")

    token = create_access_token(sub=str(user.id))
    return AuthOut(access_token=token, user=build_user_out(user))

@router.get("/me", response_model=AuthUserOut)
def me(current_user: User = Depends(get_current_user)):
    return build_user_out(current_user)

@router.post("/refresh")
def refresh(current_user: User = Depends(get_current_user)):
    token = create_access_token(sub=str(current_user.id))
    return {"access_token": token, "token_type": "bearer"}
