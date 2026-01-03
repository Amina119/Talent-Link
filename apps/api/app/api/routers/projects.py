from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List

from app.db.session import get_db
from app.models.project import Project

router = APIRouter(prefix="/projects", tags=["Projects"])

class ProjectCreate(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    description: str = Field(default="")
    status: str = "open"

class ProjectOut(BaseModel):
    id: str
    title: str
    description: str
    status: str

@router.get("", response_model=List[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.created_at.desc()).all()

@router.post("", response_model=ProjectOut)
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    p = Project(
        id=f"p_{data.title[:3].lower()}_{abs(hash(data.title)) % 100000}",
        owner_id="admin_1",  # TODO: remplacer par current_user.id (JWT)
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
