import uuid
from sqlalchemy import String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class UserPermission(Base):
    __tablename__ = "user_permissions"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        primary_key=True,
        nullable=False,
    )

    permission_code: Mapped[str] = mapped_column(
        String(64),
        ForeignKey("permissions.code"),
        primary_key=True,
        index=True,
        nullable=False,
    )

    permission = relationship("Permission")