
from pydantic import BaseModel

class ProjectTeamCreate(BaseModel):
    project_id: str
    user_id: str
    role: str = "member"

class ProjectTeamRead(BaseModel):
    id: str
    project_id: str
    user_id: str
    role: str

    class Config:
        orm_mode = True
