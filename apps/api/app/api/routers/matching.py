from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.matching_service import MatchingService
from app.schemas.matching import MatchOut

from app.models.user import User
from app.models.profile import Profile
from app.models.user_skill import UserSkill
from app.models.skill import Skill

router = APIRouter(prefix="/projects", tags=["Matching"])


@router.get("/{project_id}/matches", response_model=List[MatchOut])
def get_matches(project_id: str, db: Session = Depends(get_db)):

    # ---- Tous les utilisateurs actifs ----
    users = (
        db.query(User)
        .filter(User.is_active == True)
        .all()
    )

    if not users:
        raise HTTPException(status_code=404, detail="No candidates found")

    candidates = [u.id for u in users]

    # ---- Matching scoring ----
    service = MatchingService()
    matches = service.match(db, project_id, candidates, limit=25)

    results: list[MatchOut] = []

    for m in matches:
        user_id = m["user_id"]

        user = db.query(User).filter(User.id == user_id).first()
        profile = db.query(Profile).filter(Profile.user_id == user_id).first()

        # ---- Skills ----
        skill_rows = (
            db.query(Skill.name)
            .join(UserSkill, Skill.id == UserSkill.skill_id)
            .filter(UserSkill.user_id == user_id)
            .all()
        )
        skills = [s[0] for s in skill_rows]

        results.append(
            MatchOut(
                talent_id=user_id,
                name=user.full_name if hasattr(user, "full_name") else f"User {user_id}",
                score=m["score"],
                explanation=m["explanation"],
                skills=skills,
                city=profile.location if profile else "",
                language="French"  # MVP : champ fixe (à améliorer plus tard)
            )
        )

    return results
