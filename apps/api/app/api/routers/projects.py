from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List

from app.db.session import get_db
from app.models.project import Project
from app.models.user import User
from app.models.user_skill import UserSkill
from app.models.project_skill import ProjectSkill
from app.models.profile import Profile
from app.services.matching_service import MatchingService

router = APIRouter(prefix="/projects", tags=["Projects"])


# ---------------------------
# Schemas
# ---------------------------
class ProjectCreate(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    description: str = Field(default="")
    status: str = "open"


class ProjectOut(BaseModel):
    id: str
    title: str
    description: str
    status: str
    owner_id: str


class MatchCandidate(BaseModel):
    user_id: str
    score: int
    explanation: str


# ---------------------------
# Endpoints CRUD
# ---------------------------
@router.get("", response_model=List[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.created_at.desc()).all()


@router.post("", response_model=ProjectOut)
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    # TODO: remplacer owner_id par current_user.id via JWT
    p = Project(
        id=f"p_{data.title[:3].lower()}_{abs(hash(data.title)) % 100000}",
        owner_id="admin_1",
        title=data.title.strip(),
        description=data.description,
        status=data.status,
    )
    db.add(p)
    db.commit()
    db.refresh(p)
    return p


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: str, db: Session = Depends(get_db)):
    p = db.query(Project).filter(Project.id == project_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Projet introuvable")
    return p


# ---------------------------
# Matching Endpoint
# ---------------------------
@router.get("/{project_id}/matches", response_model=List[MatchCandidate])
def get_project_matches(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Projet introuvable")

    # Récupérer tous les utilisateurs actifs
    candidate_users = db.query(User).filter(User.is_active == True).all()
    candidate_ids = [u.id for u in candidate_users]

    # Appliquer le matching
    matching_service = MatchingService()
    matches = matching_service.match(db, project_id, candidate_ids)

    # Limiter aux top 25 profils
    top_matches = matches[:25]

    return top_matches
