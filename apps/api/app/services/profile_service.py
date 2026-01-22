from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.profile import Profile

def get_my_profile(db: Session, user_id: str) -> Profile:
    prof = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not prof:
        raise HTTPException(status_code=404, detail="Profil introuvable")
    return prof

def update_my_profile(db: Session, user_id: str, payload: dict) -> Profile:
    prof = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not prof:
        
        prof = Profile(id=f"pr_{user_id}", user_id=user_id, headline="", bio="", location="", credibility=50)
        db.add(prof)


    if "headline" in payload:
        prof.headline = (payload["headline"] or "").strip()
    if "bio" in payload:
        prof.bio = payload["bio"] or ""
    if "location" in payload:
        prof.location = (payload["location"] or "").strip()

    db.commit()
    db.refresh(prof)
    return prof
