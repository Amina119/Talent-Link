from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    
    JWT_SECRET: str = "change-me"
    JWT_REFRESH_SECRET: str = "change-me-refresh"
    JWT_ACCESS_EXPIRES_MIN: int = 60
    JWT_REFRESH_EXPIRES_DAYS: int = 7
    
    CORS_ORIGINS: str = "http://localhost:5173"
    SEED_ADMIN_EMAIL: str = "admin@talentlink.com"
    SEED_ADMIN_PASSWORD: str = "Admin12345!"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()