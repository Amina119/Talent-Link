from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.profile import ProfileOut, ProfileUpdateIn
from app.services.profile_service import get_my_profile, update_my_profile

router = APIRouter()

@router.get("/me", response_model=ProfileOut)
def my_profile(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    p = get_my_profile(db, user.id)
    return p.__dict__ | {"bio": p.bio, "department": p.department, "level": p.level, "availability": p.availability,
                         "github_username": p.github_username, "credibility_score": p.credibility_score}

@router.put("/me", response_model=ProfileOut)
def update_profile(payload: ProfileUpdateIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    p = update_my_profile(db, user.id, payload.model_dump())
    return {"bio": p.bio, "department": p.department, "level": p.level,
            "availability": p.availability, "github_username": p.github_username,
            "credibility_score": p.credibility_score}