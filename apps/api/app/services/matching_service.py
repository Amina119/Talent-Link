from abc import ABC, abstractmethod
from sqlalchemy.orm import Session
from app.models.matching_config import MatchingConfig
from app.models.project_skill import ProjectSkill
from app.models.user_skill import UserSkill
from app.models.profile import Profile

class MatchingStrategy(ABC):
    @abstractmethod
    def score(self, db: Session, project_id: str, user_id: str) -> tuple[int, str]:
        ...

class DefaultStrategy(MatchingStrategy):
    def score(self, db: Session, project_id: str, user_id: str) -> tuple[int, str]:
        cfg = db.query(MatchingConfig).first()
        w_skills = cfg.w_skills if cfg else 0.6
        w_cred = cfg.w_credibility if cfg else 0.4

        proj_skill_ids = [ps.skill_id for ps in db.query(ProjectSkill).filter(ProjectSkill.project_id == project_id).all()]
        user_skill_ids = [us.skill_id for us in db.query(UserSkill).filter(UserSkill.user_id == user_id).all()]

        if not proj_skill_ids:
            skill_score = 0.0
        else:
            inter = len(set(proj_skill_ids).intersection(set(user_skill_ids)))
            skill_score = inter / len(set(proj_skill_ids))

        prof = db.query(Profile).filter(Profile.user_id == user_id).first()
        cred = (prof.credibility if prof else 50) / 100.0

        final = (w_skills * skill_score) + (w_cred * cred)
        score100 = int(round(final * 100))
        explanation = f"skills={int(skill_score*100)}%, credibility={int(cred*100)}%, weights=({w_skills},{w_cred})"
        return score100, explanation

class MatchingService:
    def __init__(self, strategy: MatchingStrategy | None = None):
        self.strategy = strategy or DefaultStrategy()

    def match(self, db: Session, project_id: str, candidates: list[str]) -> list[dict]:
        out = []
        for uid in candidates:
            s, exp = self.strategy.score(db, project_id, uid)
            out.append({"user_id": uid, "score": s, "explanation": exp})
        return sorted(out, key=lambda x: x["score"], reverse=True)
