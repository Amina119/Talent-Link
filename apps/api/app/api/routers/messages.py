from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

router = APIRouter(prefix="/teams", tags=["Messages"])

class MessageOut(BaseModel):
    id: str
    team_id: str
    sender: str
    text: str
    created_at: datetime

class MessageCreate(BaseModel):
    text: str = Field(min_length=1, max_length=2000)

# Mock storage
MESSAGES = {
    "team_1": [
        {
            "id": "m1",
            "team_id": "team_1",
            "sender": "Team",
            "text": "Bienvenue sur le chat d’équipe 🎉",
            "created_at": datetime.utcnow(),
        }
    ]
}

@router.get("/{team_id}/messages", response_model=List[MessageOut])
def list_team_messages(team_id: str):
    return MESSAGES.get(team_id, [])

@router.post("/{team_id}/messages", response_model=MessageOut)
def send_team_message(team_id: str, data: MessageCreate):
    msg = {
        "id": f"m{int(datetime.utcnow().timestamp())}",
        "team_id": team_id,
        "sender": "Moi",
        "text": data.text.strip(),
        "created_at": datetime.utcnow(),
    }
    MESSAGES.setdefault(team_id, []).append(msg)
    return msg
