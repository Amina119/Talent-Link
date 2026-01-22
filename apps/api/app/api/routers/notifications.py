from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/notifications", tags=["Notifications"])

class NotificationOut(BaseModel):
    id: str
    title: str
    body: str
    read: bool
    created_at: datetime

class MarkReadIn(BaseModel):
    read: bool = True

# Mock storage
NOTIFS = [
    {
        "id": "n1",
        "title": "Invitation d’équipe",
        "body": "Amina t’a invité sur Projet Alpha.",
        "read": False,
        "created_at": datetime.utcnow(),
    },
    {
        "id": "n2",
        "title": "Match disponible",
        "body": "Nouveaux talents recommandés pour ton projet.",
        "read": True,
        "created_at": datetime.utcnow(),
    },
]

@router.get("", response_model=List[NotificationOut])
def list_notifications():
    return NOTIFS

@router.patch("/{notif_id}", response_model=NotificationOut)
def mark_notification(notif_id: str, data: MarkReadIn):
    for n in NOTIFS:
        if n["id"] == notif_id:
            n["read"] = data.read
            return n
    # MVP: si introuvable, renvoie un faux objet
    return {
        "id": notif_id,
        "title": "Notification",
        "body": "Introuvable (MVP).",
        "read": True,
        "created_at": datetime.utcnow(),
    }

@router.post("/mark-all-read")
def mark_all_read():
    for n in NOTIFS:
        n["read"] = True
    return {"message": "Toutes les notifications ont été marquées comme lues."}
