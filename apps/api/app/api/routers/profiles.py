import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.core.deps import get_db, get_current_user
from app.models.profile import Profile
from app.models.user_skill import UserSkill
from app.models.skill import Skill
from app.models.file_asset import FileAsset
from app.schemas.profile import ProfileOut, ProfileUpdateIn

router = APIRouter(prefix="/profiles", tags=["profiles"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")

def ensure_profile(db: Session, user_id: uuid.UUID) -> Profile:
    prof = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not prof:
        prof = Profile(user_id=user_id)
        db.add(prof)
        db.commit()
        db.refresh(prof)
    return prof

def build_profile_out(db: Session, prof: Profile, full_name: str | None) -> ProfileOut:
    # skills with names
    skills_out = []
    for us in prof.skills:
        skills_out.append({"skill_id": str(us.skill_id), "name": us.skill.name, "level": us.level})

    files_out = []
    for f in prof.files:
        files_out.append({"id": str(f.id), "kind": f.kind, "filename": f.filename, "url": None})

    return ProfileOut(
        full_name=full_name,
        headline=prof.headline,
        bio=prof.bio,
        location=prof.location,
        experience_years=prof.experience_years,
        tags=prof.tags or [],
        github_username=prof.github_username,
        skills=skills_out,
        files=files_out,
    )

@router.get("/me", response_model=ProfileOut)
def get_me(db: Session = Depends(get_db), user=Depends(get_current_user)):
    prof = ensure_profile(db, user.id)
    return build_profile_out(db, prof, user.full_name)

@router.put("/me", response_model=ProfileOut)
def update_me(payload: ProfileUpdateIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    prof = ensure_profile(db, user.id)

  
    if payload.full_name is not None:
        user.full_name = payload.full_name

    prof.headline = payload.headline
    prof.bio = payload.bio
    prof.location = payload.location
    prof.experience_years = payload.experience_years
    prof.tags = payload.tags
    prof.github_username = payload.github_username

    db.commit()
    db.refresh(prof)
    return build_profile_out(db, prof, user.full_name)

@router.post("/me/skills", response_model=ProfileOut)
def add_skill(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    prof = ensure_profile(db, user.id)

    skill_id = payload.get("skill_id")
    level = int(payload.get("level", 3))
    if not skill_id:
        raise HTTPException(status_code=400, detail="skill_id required")
    if level < 1 or level > 5:
        raise HTTPException(status_code=400, detail="level must be 1..5")

    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    existing = db.query(UserSkill).filter(UserSkill.user_id == user.id, UserSkill.skill_id == skill_id).first()
    if existing:
        existing.level = level
    else:
        db.add(UserSkill(user_id=user.id, skill_id=skill.id, level=level))

    db.commit()
    db.refresh(prof)
    return build_profile_out(db, prof, user.full_name)

@router.delete("/me/skills/{skill_id}", response_model=ProfileOut)
def delete_skill(skill_id: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    prof = ensure_profile(db, user.id)

    row = db.query(UserSkill).filter(UserSkill.user_id == user.id, UserSkill.skill_id == skill_id).first()
    if row:
        db.delete(row)
        db.commit()

    db.refresh(prof)
    return build_profile_out(db, prof, user.full_name)

@router.post("/me/files", response_model=ProfileOut)
def upload_file(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
    file: UploadFile = File(...),
    kind: str = Form(...),
):
    prof = ensure_profile(db, user.id)

    kind = kind.strip().lower()
    if kind not in ("cv", "portfolio"):
        raise HTTPException(status_code=400, detail="kind must be cv or portfolio")

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    safe_name = file.filename.replace("/", "_").replace("\\", "_")
    storage_path = os.path.join(UPLOAD_DIR, f"{user.id}_{kind}_{safe_name}")

    with open(storage_path, "wb") as f:
        f.write(file.file.read())

    asset = FileAsset(user_id=user.id, kind=kind, filename=file.filename, storage_path=storage_path)
    db.add(asset)
    db.commit()
    db.refresh(prof)
    return build_profile_out(db, prof, user.full_name)
