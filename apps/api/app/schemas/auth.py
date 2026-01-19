from pydantic import BaseModel, EmailStr, Field

class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str | None = None

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class AuthUserOut(BaseModel):
    id: str
    email: EmailStr
    role: str
    permissions: list[str] = []

class AuthOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AuthUserOut
