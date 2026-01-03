from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.deps import require_perm
from app.models.user import User
from app.services.audit_service import log

router = APIRouter()

@router.get("/users")
def list_users(db: Session = Depends(get_db), _admin=Depends(require_perm("ADMIN_USERS"))):
    users = db.query(User).order_by(User.created_at.desc()).limit(200).all()
    return [{"id": u.id, "email": u.email, "full_name": u.full_name, "role": u.role, "is_active": u.is_active} for u in users]

@router.post("/users/{user_id}/suspend")
def suspend_user(user_id: int, db: Session = Depends(get_db), admin: User = Depends(require_perm("ADMIN_USERS"))):
    u = db.get(User, user_id)
    u.is_active = False
    db.commit()
    log(db, admin.id, "USER_SUSPENDED", "USER", str(user_id), {"email": u.email})
    return {"ok": True}

@router.post("/users/{user_id}/restore")
def restore_user(user_id: int, db: Session = Depends(get_db), admin: User = Depends(require_perm("ADMIN_USERS"))):
    u = db.get(User, user_id)
    u.is_active = True
    db.commit()
    log(db, admin.id, "USER_RESTORED", "USER", str(user_id), {"email": u.email})
    return {"ok": True}
