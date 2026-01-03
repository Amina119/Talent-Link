from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/github", tags=["GitHub"])

class ConnectIn(BaseModel):
    username: str = Field(min_length=2, max_length=60)

class GitHubAccountOut(BaseModel):
    username: str
    connected: bool

GITHUB_STATE = {"connected": False, "username": None}

@router.post("/connect", response_model=GitHubAccountOut)
def connect(data: ConnectIn):
    GITHUB_STATE["connected"] = True
    GITHUB_STATE["username"] = data.username.strip()
    return {"username": GITHUB_STATE["username"], "connected": True}

@router.post("/disconnect")
def disconnect():
    GITHUB_STATE["connected"] = False
    GITHUB_STATE["username"] = None
    return {"message": "GitHub déconnecté."}

@router.post("/sync")
def sync():
    if not GITHUB_STATE["connected"]:
        return {"message": "Aucun compte GitHub connecté.", "synced": False}
    return {
        "synced": True,
        "username": GITHUB_STATE["username"],
        "stats": {
            "repos": 12,
            "stars": 31,
            "recent_commits": 48,
        },
        "message": "Sync GitHub (MVP) terminée.",
    }
