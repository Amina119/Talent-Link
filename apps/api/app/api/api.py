from fastapi import APIRouter
from app.api.routers import (
    health,
    auth,
    profiles,
    projects,
    talents,
    skills,
    teams,
    messages,
    notifications,
    feedback,
    matching,
    github,
)

from app.api.routers.admin.admin_users import router as admin_users_router
from app.api.routers.admin.admin_audit import router as admin_audit_router

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(profiles.router, prefix="/profiles", tags=["Profiles"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(talents.router, prefix="/talents", tags=["Talents"])
api_router.include_router(skills.router, prefix="/skills", tags=["Skills"])
api_router.include_router(teams.router, prefix="/teams", tags=["Teams"])
api_router.include_router(messages.router, prefix="/messages", tags=["Messages"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["Feedback"])
api_router.include_router(matching.router, prefix="/matching", tags=["Matching"])
api_router.include_router(github.router, prefix="/github", tags=["GitHub"])

api_router.include_router(admin_users_router, prefix="/admin/users", tags=["Admin"])
api_router.include_router(admin_audit_router, prefix="/admin/audit", tags=["Admin"])