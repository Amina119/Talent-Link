from fastapi import APIRouter
from app.api.routers.auth import router as auth_router
from app.api.routers.skills import router as skills_router
from app.api.routers.profiles import router as profiles_router
from app.api.routers.github import router as github_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(skills_router)
api_router.include_router(profiles_router)
api_router.include_router(github_router)
