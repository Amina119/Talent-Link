from abc import ABC, abstractmethod
from sqlalchemy.orm import Session

from app.models.matching_config import MatchingConfig
from app.models.project_skill import ProjectSkill
from app.models.user_skill import UserSkill
from app.models.profile import Profile
from app.models.skill import Skill


class MatchingStrategy(ABC):
    @abstractmethod
    def score(self, db: Session, project_id: str, user_id: str) -> dict:
        ...


class DefaultStrategy(MatchingStrategy):
    def score(self, db: Session, project_id: str, user_id: str) -> dict:
        # ---- Config ----
        cfg = db.query(MatchingConfig).first()
        w_skills = cfg.w_skills if cfg else 0.6
        w_cred = cfg.w_credibility if cfg else 0.4

        # ---- Project skills ----
        project_skills = db.query(ProjectSkill).filter(
            ProjectSkill.project_id == project_id
        ).all()
        project_skill_ids = {ps.skill_id for ps in project_skills}

        # ---- User skills ----
        user_skills = db.query(UserSkill).filter(
            UserSkill.user_id == user_id
        ).all()
        user_skill_ids = {us.skill_id for us in user_skills}

        # ---- Skill score ----
        if not project_skill_ids:
            skill_score = 0.0
        else:
            common = project_skill_ids & user_skill_ids
            skill_score = len(common) / len(project_skill_ids)

        # ---- Profile ----
        profile = db.query(Profile).filter(Profile.user_id == user_id).first()
        credibility = (profile.experience_years or 1) / 10
        credibility = min(credibility, 1.0)

        # ---- Final score ----
        final_score = (w_skills * skill_score) + (w_cred * credibility)
        score100 = int(round(final_score * 100))

        # ---- Skill names ----
        skills = (
            db.query(Skill.name)
            .join(UserSkill, Skill.id == UserSkill.skill_id)
            .filter(UserSkill.user_id == user_id)
            .all()
        )
        skill_names = [s[0] for s in skills]

        return {
            "user_id": user_id,
            "score": score100,
            "explanation": (
                f"skills={int(skill_score*100)}%, "
                f"experience={int(credibility*100)}%"
            ),
            "skills": skill_names,
            "city": profile.location if profile else "",
            "language": profile.tags[0] if profile and profile.tags else "",
        }


class MatchingService:
    def __init__(self, strategy: MatchingStrategy | None = None):
        self.strategy = strategy or DefaultStrategy()

    def match(
        self,
        db: Session,
        project_id: str,
        candidates: list[str],
        limit: int = 25
    ) -> list[dict]:

        results = []
        for user_id in candidates:
            results.append(
                self.strategy.score(db, project_id, user_id)
            )

        return sorted(
            results,
            key=lambda x: x["score"],
            reverse=True
        )[:limit]
