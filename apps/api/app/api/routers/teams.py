from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
import uuid

from app.db.session import get_db
from app.models.team import Team
from app.models.team_member import TeamMember
from app.models.user import User

router = APIRouter(prefix="/teams", tags=["Teams"])

# -------------------------------
# Schemas
# -------------------------------

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

# -------------------------------
# Teams Endpoints
# -------------------------------

@router.get("", response_model=List[TeamOut])
def list_teams(db: Session = Depends(get_db)):
    teams = db.query(Team).all()
    out = []
    for t in teams:
        members_count = db.query(TeamMember).filter(TeamMember.team_id == t.id).count()
        out.append(TeamOut(
            id=t.id,
            name=t.name,
            project_id=t.project_id,
            members_count=members_count
        ))
    return out

@router.post("", response_model=TeamOut)
def create_team(data: TeamCreate, db: Session = Depends(get_db)):
    team_id = f"team_{uuid.uuid4().hex[:8]}"
    team = Team(
        id=team_id,
        name=data.name.strip(),
        project_id=data.project_id
    )
    db.add(team)
    db.commit()
    db.refresh(team)

    # Crée automatiquement le propriétaire comme membre (TODO: remplacer admin_1 par current_user.id)
    member = TeamMember(
        id=f"tm_{uuid.uuid4().hex[:8]}",
        team_id=team.id,
        user_id="admin_1",
        role="owner"
    )
    db.add(member)
    db.commit()

    return TeamOut(
        id=team.id,
        name=team.name,
        project_id=team.project_id,
        members_count=1
    )

@router.get("/{team_id}", response_model=TeamOut)
def get_team(team_id: str, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    members_count = db.query(TeamMember).filter(TeamMember.team_id == team_id).count()
    return TeamOut(
        id=team.id,
        name=team.name,
        project_id=team.project_id,
        members_count=members_count
    )

# -------------------------------
# Invitations
# -------------------------------

@router.post("/{team_id}/invite", response_model=InviteOut)
def invite_to_team(team_id: str, data: InviteIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Vérifie si déjà membre ou invité
    existing = db.query(TeamMember).filter(
        TeamMember.team_id == team_id,
        TeamMember.user_id == user.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already in team or invited")

    invite_id = f"tm_{uuid.uuid4().hex[:8]}"
    invite = TeamMember(
        id=invite_id,
        team_id=team_id,
        user_id=user.id,
        role="pending"
    )
    db.add(invite)
    db.commit()
    db.refresh(invite)

    return InviteOut(
        id=invite.id,
        team_id=invite.team_id,
        email=user.email,
        status=invite.role,
        created_at=datetime.utcnow()
    )

@router.get("/{team_id}/invites", response_model=List[InviteOut])
def list_invites(team_id: str, db: Session = Depends(get_db)):
    invites = db.query(TeamMember).filter(
        TeamMember.team_id == team_id,
        TeamMember.role == "pending"
    ).all()
    out = []
    for i in invites:
        user = db.query(User).filter(User.id == i.user_id).first()
        if user:
            out.append(InviteOut(
                id=i.id,
                team_id=i.team_id,
                email=user.email,
                status=i.role,
                created_at=datetime.utcnow()
            ))
    return out

@router.post("/invites/{invite_id}/accept", response_model=InviteOut)
def accept_invite(invite_id: str, db: Session = Depends(get_db)):
    invite = db.query(TeamMember).filter(TeamMember.id == invite_id).first()
    if not invite:
        raise HTTPException(status_code=404, detail="Invite not found")
    invite.role = "member"
    db.commit()
    db.refresh(invite)

    user = db.query(User).filter(User.id == invite.user_id).first()
    return InviteOut(
        id=invite.id,
        team_id=invite.team_id,
        email=user.email,
        status=invite.role,
        created_at=datetime.utcnow()
    )

@router.post("/invites/{invite_id}/decline", response_model=InviteOut)
def decline_invite(invite_id: str, db: Session = Depends(get_db)):
    invite = db.query(TeamMember).filter(TeamMember.id == invite_id).first()
    if not invite:
        raise HTTPException(status_code=404, detail="Invite not found")
    db.delete(invite)
    db.commit()

    user = db.query(User).filter(User.id == invite.user_id).first()
    return InviteOut(
        id=invite_id,
        team_id=invite.team_id,
        email=user.email if user else "unknown@x.com",
        status="declined",
        created_at=datetime.utcnow()
    )
