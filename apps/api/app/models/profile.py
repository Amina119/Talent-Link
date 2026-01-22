import uuid

from sqlalchemy import ForeignKey, String, Integer, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Profile(Base):
    __tablename__ = "profiles"

    
    user_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )

    # --- Champs demandés par ton produit ---
    profession: Mapped[str | None] = mapped_column(String(120), nullable=True)

    # status: available | busy | part-time
    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="available",
    )

    # --- Champs existants ---
    headline: Mapped[str | None] = mapped_column(String(200), nullable=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    location: Mapped[str | None] = mapped_column(String(120), nullable=True)
    experience_years: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # SQLite-friendly list[str]
    tags: Mapped[list[str]] = mapped_column(
        JSON,
        default=list,
        nullable=False,
    )

    github_username: Mapped[str | None] = mapped_column(String(120), nullable=True)

    # --- Relations ---
    skills = relationship(
        "UserSkill",
        back_populates="profile",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    files = relationship(
        "FileAsset",
        back_populates="profile",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
