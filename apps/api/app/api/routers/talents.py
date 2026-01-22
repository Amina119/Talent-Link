from fastapi import APIRouter, Query, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.models.user import User
from app.models.profile import Profile
from app.models.user_skill import UserSkill
from app.models.skill import Skill
from pydantic import BaseModel

router = APIRouter(prefix="/talents", tags=["Talents"])

class TalentOut(BaseModel):
    id: str
    name: str
    headline: Optional[str]
    credibility: int
    skills: List[str]
    location: Optional[str] = None

def compute_credibility(profile: Profile | None) -> int:
    if not profile or not profile.experience_years:
        return 0
    return min(100, profile.experience_years * 10)

@router.get("", response_model=List[TalentOut])
def search_talents(
    q: Optional[str] = Query(default=None),
    min_cred: int = Query(default=0, ge=0, le=100),
    db: Session = Depends(get_db),
):
    ql = (q or "").lower().strip()

    users = (
        db.query(User)
        .filter(User.is_active == True)
        .limit(25)
        .all()
    )

    results: List[TalentOut] = []

    for u in users:
        profile = db.query(Profile).filter(Profile.user_id == u.id).first()
        credibility = compute_credibility(profile)

        if credibility < min_cred:
            continue

        # Skills
        skills = (
            db.query(Skill.name)
            .join(UserSkill, UserSkill.skill_id == Skill.id)
            .filter(UserSkill.user_id == u.id)
            .all()
        )
        skills_list = [s[0] for s in skills]

        # Search filter
        if ql:
            haystack = " ".join([
                u.email.lower(),
                profile.headline.lower() if profile and profile.headline else "",
                " ".join(skills_list).lower(),
            ])
            if ql not in haystack:
                continue

        results.append(TalentOut(
            id=u.id,
            name=u.email.split("@")[0],
            headline=profile.headline if profile else None,
            credibility=credibility,
            skills=skills_list,
            location=profile.location if profile else None,
        ))

    return results


@router.get("/{talent_id}", response_model=TalentOut)
def talent_details(talent_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == talent_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Talent not found")

    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    credibility = compute_credibility(profile)

    skills = (
        db.query(Skill.name)
        .join(UserSkill, UserSkill.skill_id == Skill.id)
        .filter(UserSkill.user_id == user.id)
        .all()
    )

    return TalentOut(
        id=user.id,
        name=user.email.split("@")[0],
        headline=profile.headline if profile else None,
        credibility=credibility,
        skills=[s[0] for s in skills],
        location=profile.location if profile else None,
    )
