from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.auth import RegisterIn, LoginIn, TokenOut, MeOut
from app.services.auth_service import register, login
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/register", response_model=TokenOut)
def register_route(payload: RegisterIn, db: Session = Depends(get_db)):
    token = register(db, payload.email, payload.full_name, payload.password)
    return {"access_token": token}

@router.post("/login", response_model=TokenOut)
def login_route(payload: LoginIn, db: Session = Depends(get_db)):
    token = login(db, payload.email, payload.password)
    return {"access_token": token}

@router.get("/me", response_model=MeOut)
def me_route(user: User = Depends(get_current_user)):
    perms = [up.permission_code for up in user.permissions]
    return {"id": user.id, "email": user.email, "full_name": user.full_name, "role": user.role, "perms": perms}
