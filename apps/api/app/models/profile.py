from sqlalchemy import String, Integer, DateTime, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, index=True)

    bio: Mapped[str] = mapped_column(String(800), default="", nullable=False)
    department: Mapped[str] = mapped_column(String(120), default="", nullable=False)
    level: Mapped[str] = mapped_column(String(60), default="", nullable=False)
    availability: Mapped[str] = mapped_column(String(60), default="available", nullable=False)
    github_username: Mapped[str] = mapped_column(String(120), default="", nullable=False)

    credibility_score: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="profile")