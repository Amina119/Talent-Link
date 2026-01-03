from fastapi import APIRouter

router = APIRouter(prefix="/feedback", tags=["Feedback"])

@router.get("")
def list_feedback():
    return []

@router.post("")
def add_feedback():
    return {"message": "Feedback ajouté (MVP)"}
