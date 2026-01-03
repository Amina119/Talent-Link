from pydantic import BaseModel, Field

class ProfileOut(BaseModel):
    bio: str
    department: str
    level: str
    availability: str
    github_username: str
    credibility_score: int

class ProfileUpdateIn(BaseModel):
    bio: str | None = Field(default=None, max_length=800)
    department: str | None = Field(default=None, max_length=120)
    level: str | None = Field(default=None, max_length=60)
    availability: str | None = Field(default=None, max_length=60)
    github_username: str | None = Field(default=None, max_length=120)