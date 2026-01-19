from pydantic import BaseModel

class ProfileUpdateIn(BaseModel):
    full_name: str | None = None
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
    full_name: str | None = None
    headline: str | None = None
    bio: str | None = None
    location: str | None = None
    experience_years: int | None = None
    tags: list[str] | None = None
    github_username: str | None = None

    skills: list[UserSkillOut] = []
    files: list[FileOut] = []
