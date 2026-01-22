from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.api import api_router

try:
    from app.db.session import engine
    from app.db.base import Base

    from app.models.user import User  
    from app.models.permission import Permission 
    from app.models.user_permission import UserPermission 
    from app.models.profile import Profile  
    from app.models.skill import Skill  
    from app.models.user_skill import UserSkill 
    from app.models.file_asset import FileAsset  
    from app.models.project import Project  
    from app.models.project_skill import ProjectSkill 
    from app.models.team import Team  
    from app.models.team_member import TeamMember 
    from app.models.notification import Notification  
    from app.models.feedback import Feedback  
    from app.models.audit_log import AuditLog  

    _CAN_CREATE_TABLES = True
except Exception:
    
    _CAN_CREATE_TABLES = False


def build_origins(cors_string: str) -> list[str]:
    return [o.strip() for o in (cors_string or "").split(",") if o.strip()]


app = FastAPI(title=settings.APP_NAME)


origins = build_origins(getattr(settings, "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"))
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router)


if _CAN_CREATE_TABLES:
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"ok": True, "env": settings.ENV}
