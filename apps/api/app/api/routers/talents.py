from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/talents", tags=["Talents"])

class TalentOut(BaseModel):
    id: str
    name: str
    headline: str
    credibility: int
    skills: List[str]
    location: Optional[str] = None

TALENTS = [
    {"id": "t1", "name": "Amina K.", "headline": "Frontend • UI/UX", "credibility": 84, "skills": ["React", "TypeScript", "Figma"], "location": "Douala"},
    {"id": "t2", "name": "David S.", "headline": "Backend • APIs", "credibility": 76, "skills": ["FastAPI", "PostgreSQL", "Docker"], "location": "Yaoundé"},
    {"id": "t3", "name": "Junior X.", "headline": "Junior Dev", "credibility": 61, "skills": ["React"], "location": "Bafoussam"},
]

@router.get("", response_model=List[TalentOut])
def search_talents(
    q: Optional[str] = Query(default=None),
    min_cred: int = Query(default=0, ge=0, le=100),
):
    ql = (q or "").strip().lower()
    out = []
    for t in TALENTS:
        ok_q = (
            not ql
            or ql in t["name"].lower()
            or ql in t["headline"].lower()
            or any(ql in s.lower() for s in t["skills"])
        )
        ok_c = t["credibility"] >= min_cred
        if ok_q and ok_c:
            out.append(t)
    return out

@router.get("/{talent_id}", response_model=TalentOut)
def talent_details(talent_id: str):
    for t in TALENTS:
        if t["id"] == talent_id:
            return t
    return {"id": talent_id, "name": "Talent (MVP)", "headline": "—", "credibility": 0, "skills": [], "location": None}
