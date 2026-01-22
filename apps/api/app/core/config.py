from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENV: str = "dev"
    APP_NAME: str = "TalentLink API"

    # FORCE SQLite only
    DATABASE_URL: str = "sqlite:///./app.db"

    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    JWT_SECRET: str = "change-me"
    JWT_ALG: str = "HS256"
    JWT_REFRESH_SECRET: str = "change-me-refresh"

    ACCESS_TOKEN_MINUTES: int = 60
    REFRESH_TOKEN_DAYS: int = 7

    ADMIN_EMAIL: str = "admin@talentlink.com"
    ADMIN_PASSWORD: str = "Admin123!"
    ADMIN_FULL_NAME: str = "TalentLink Admin"

    UPLOAD_DIR: str = "uploads"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="",       
        extra="ignore",
        case_sensitive=False,
    )


settings = Settings()
