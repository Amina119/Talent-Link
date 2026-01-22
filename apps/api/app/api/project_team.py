# app/api/project_team.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.project_team import ProjectTeamCreate, ProjectTeamRead
from app.crud import project_team as crud
from app.db.session import get_db

router = APIRouter()

@router.post("/project-team/", response_model=ProjectTeamRead)
def add_project_member(data: ProjectTeamCreate, db: Session = Depends(get_db)):
    # Vérifier que l'utilisateur n'est pas déjà dans le projet
    existing = db.query(crud.ProjectTeam).filter(
        crud.ProjectTeam.project_id == data.project_id,
        crud.ProjectTeam.user_id == data.user_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already in project")
    return crud.add_member(db, data)

@router.get("/project-team/{project_id}", response_model=List[ProjectTeamRead])
def get_project_members(project_id: str, db: Session = Depends(get_db)):
    return crud.list_members(db, project_id)
