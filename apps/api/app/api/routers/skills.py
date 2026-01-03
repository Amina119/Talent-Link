from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List

router = APIRouter(prefix="/skills", tags=["Skills"])

class SkillOut(BaseModel):
    id: str
    name: str

class SkillCreate(BaseModel):
    name: str = Field(min_length=2, max_length=60)

SKILLS = [
    {"id": "s1", "name": "React"},
    {"id": "s2", "name": "FastAPI"},
    {"id": "s3", "name": "PostgreSQL"},
    {"id": "s4", "name": "Docker"},
]

@router.get("", response_model=List[SkillOut])
def list_skills():
    return SKILLS

@router.post("/admin", response_model=SkillOut)
def admin_create_skill(data: SkillCreate):
    sk = {"id": f"s{len(SKILLS) + 1}", "name": data.name.strip()}
    SKILLS.append(sk)
    return sk

@router.delete("/admin/{skill_id}")
def admin_delete_skill(skill_id: str):
    global SKILLS
    before = len(SKILLS)
    SKILLS = [s for s in SKILLS if s["id"] != skill_id]
    return {"deleted": before - len(SKILLS)}
