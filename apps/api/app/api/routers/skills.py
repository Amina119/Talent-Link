from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.deps import get_db
from app.models.skill import Skill

router = APIRouter(prefix="/skills", tags=["skills"])

@router.get("")
def list_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).order_by(Skill.name.asc()).all()
    return [{"id": str(s.id), "name": s.name} for s in skills]
