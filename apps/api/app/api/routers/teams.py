from fastapi import APIRouter
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/teams", tags=["Teams"])

class TeamOut(BaseModel):
    id: str
    name: str
    project_id: Optional[str] = None
    members_count: int

class TeamCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    project_id: Optional[str] = None

class InviteIn(BaseModel):
    email: EmailStr

class InviteOut(BaseModel):
    id: str
    team_id: str
    email: EmailStr
    status: str  # pending/accepted/declined
    created_at: datetime

# Mock storage
TEAMS = [
    {"id": "team_1", "name": "Team • Projet Alpha", "project_id": "p1", "members_count": 3},
]
INVITES = [
    {"id": "inv_1", "team_id": "team_1", "email": "new@member.com", "status": "pending", "created_at": datetime.utcnow()},
]

@router.get("", response_model=List[TeamOut])
def list_teams():
    return TEAMS

@router.post("", response_model=TeamOut)
def create_team(data: TeamCreate):
    team = {
        "id": f"team_{len(TEAMS) + 1}",
        "name": data.name.strip(),
        "project_id": data.project_id,
        "members_count": 1,
    }
    TEAMS.append(team)
    return team

@router.get("/{team_id}", response_model=TeamOut)
def get_team(team_id: str):
    for t in TEAMS:
        if t["id"] == team_id:
            return t
    return {"id": team_id, "name": "Team (MVP)", "project_id": None, "members_count": 0}

@router.post("/{team_id}/invite", response_model=InviteOut)
def invite_to_team(team_id: str, data: InviteIn):
    inv = {
        "id": f"inv_{len(INVITES) + 1}",
        "team_id": team_id,
        "email": data.email,
        "status": "pending",
        "created_at": datetime.utcnow(),
    }
    INVITES.append(inv)
    return inv

@router.get("/{team_id}/invites", response_model=List[InviteOut])
def list_invites(team_id: str):
    return [i for i in INVITES if i["team_id"] == team_id]

@router.post("/invites/{invite_id}/accept", response_model=InviteOut)
def accept_invite(invite_id: str):
    for i in INVITES:
        if i["id"] == invite_id:
            i["status"] = "accepted"
            return i
    return {"id": invite_id, "team_id": "unknown", "email": "unknown@x.com", "status": "accepted", "created_at": datetime.utcnow()}

@router.post("/invites/{invite_id}/decline", response_model=InviteOut)
def decline_invite(invite_id: str):
    for i in INVITES:
        if i["id"] == invite_id:
            i["status"] = "declined"
            return i
    return {"id": invite_id, "team_id": "unknown", "email": "unknown@x.com", "status": "declined", "created_at": datetime.utcnow()}
