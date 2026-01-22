from pydantic import BaseModel, EmailStr
from typing import Literal

Availability = Literal["available", "busy", "part-time"]


class ProfileUpdateIn(BaseModel):
    full_name: str | None = None
    profession: str | None = None
    status: Availability | None = None

    headline: str | None = None
    bio: str | None = None
    location: str | None = None
    experience_years: int | None = None
    tags: list[str] | None = None
    github_username: str | None = None


class UserSkillOut(BaseModel):
    skill_id: str
    name: str
    level: int


class FileOut(BaseModel):
    id: str
    kind: str
    filename: str
    url: str | None = None


class ProfileOut(BaseModel):
    
    id: str | None = None
    email: EmailStr | None = None
    full_name: str | None = None
    role: str | None = None

    
    profession: str | None = None
    status: Availability | None = None

    headline: str | None = None
    bio: str | None = None
    location: str | None = None
    experience_years: int | None = None
    tags: list[str] | None = None
    github_username: str | None = None

    skills: list[UserSkillOut] = []
    files: list[FileOut] = []
