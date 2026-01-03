from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/projects", tags=["Matching"])

class MatchOut(BaseModel):
    talent_id: str
    name: str
    score: int
    explanation: str
    skills: List[str]

@router.get("/{project_id}/matches", response_model=List[MatchOut])
def get_matches(project_id: str):
    # MVP: mock scores
    return [
        {
            "talent_id": "t1",
            "name": "Amina K.",
            "score": 92,
            "explanation": "Skills proches du besoin + crédibilité élevée.",
            "skills": ["React", "UI/UX", "TypeScript"],
        },
        {
            "talent_id": "t2",
            "name": "David S.",
            "score": 78,
            "explanation": "Backend solide, bonne compatibilité projet.",
            "skills": ["FastAPI", "PostgreSQL", "Docker"],
        },
        {
            "talent_id": "t3",
            "name": "Junior X.",
            "score": 61,
            "explanation": "Compétences partielles, crédibilité moyenne.",
            "skills": ["React"],
        },
    ]
