from pydantic import BaseModel, EmailStr, Field
from typing import Literal


Availability = Literal["available", "busy", "part-time"]


class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72) 
    full_name: str | None = None

    
    profession: str | None = Field(default=None, max_length=200)
    skills: list[str] = Field(default_factory=list, max_length=50)  
    status: Availability | None = "available"


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class AuthUserOut(BaseModel):
    id: str
    email: EmailStr
    full_name: str | None = None
    role: str
    permissions: list[str] = []


class AuthOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AuthUserOut
