from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # App
    ENV: str = "dev"
    APP_NAME: str = "TalentLink API"

    # DB
    DATABASE_URL: str = "sqlite:///./app.db"

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    # JWT
    JWT_SECRET: str = "change-me"
    JWT_REFRESH_SECRET: str = "change-me-refresh"
    JWT_ALG: str = "HS256"

    # Token durations
    ACCESS_TOKEN_MINUTES: int = 60
    REFRESH_TOKEN_DAYS: int = 7

    # Admin seed
    ADMIN_EMAIL: str = "admin@talentlink.com"
    ADMIN_PASSWORD: str = "Admin123!"
    ADMIN_FULL_NAME: str = "TalentLink Admin"

    # Uploads
    UPLOAD_DIR: str = "uploads"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=False,  
    )


settings = Settings()
