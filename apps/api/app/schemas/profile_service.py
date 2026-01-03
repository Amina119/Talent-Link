from sqlalchemy.orm import Session
from app.models.profile import Profile
from app.services.audit_service import log

def get_my_profile(db: Session, user_id: int) -> Profile:
    return db.query(Profile).filter(Profile.user_id == user_id).first()

def update_my_profile(db: Session, user_id: int, data: dict) -> Profile:
    p = get_my_profile(db, user_id)
    for k, v in data.items():
        if v is not None and hasattr(p, k):
            setattr(p, k, v)
    db.commit()
    db.refresh(p)
    log(db, user_id, "PROFILE_UPDATED", "USER", str(user_id), {"fields": [k for k,v in data.items() if v is not None]})
    return p
