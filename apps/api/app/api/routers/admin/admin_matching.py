from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.matching_config import MatchingConfig
from app.core.deps import require_perm

router = APIRouter(prefix="/admin/matching", tags=["Admin"])

class MatchingConfigIn(BaseModel):
    w_skills: float = Field(ge=0, le=1)
    w_credibility: float = Field(ge=0, le=1)

@router.get("", dependencies=[Depends(require_perm("ADMIN_MATCHING"))])
def get_cfg(db: Session = Depends(get_db)):
    cfg = db.query(MatchingConfig).first()
    return {"w_skills": cfg.w_skills, "w_credibility": cfg.w_credibility} if cfg else {"w_skills": 0.6, "w_credibility": 0.4}

@router.put("", dependencies=[Depends(require_perm("ADMIN_MATCHING"))])
def update_cfg(data: MatchingConfigIn, db: Session = Depends(get_db)):
    cfg = db.query(MatchingConfig).first()
    if not cfg:
        cfg = MatchingConfig(id="cfg_1", w_skills=data.w_skills, w_credibility=data.w_credibility)
        db.add(cfg)
    else:
        cfg.w_skills = data.w_skills
        cfg.w_credibility = data.w_credibility
    db.commit()
    return {"message": "Config matching mise à jour"}
