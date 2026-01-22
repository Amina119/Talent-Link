import uuid
from sqlalchemy import String, Boolean, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )

    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    role: Mapped[str] = mapped_column(String(50), default="member")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    full_name: Mapped[str | None] = mapped_column(String(200), nullable=True)
    profession: Mapped[str | None] = mapped_column(String(100), nullable=True)
    status: Mapped[str | None] = mapped_column(String(50), nullable=True)

    skills: Mapped[list[str]] = mapped_column(JSON, default=list)
    languages: Mapped[list[str]] = mapped_column(JSON, default=list)

    reliability: Mapped[int] = mapped_column(Integer, default=0)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)

    profile = relationship(
        "Profile",
        backref="user",
        uselist=False,
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    permissions = relationship(
        "UserPermission",
        backref="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    projects_created = relationship(
    "Project",
    back_populates="owner",
    cascade="all, delete-orphan",
    passive_deletes=True,
)

    project_teams = relationship(
        "ProjectTeam",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    team_members = relationship(
        "TeamMember",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
