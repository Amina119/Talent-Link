from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class UserPermission(Base):
    __tablename__ = "user_permissions"
    __table_args__ = (UniqueConstraint("user_id", "permission_code", name="uq_user_perm"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    permission_code: Mapped[str] = mapped_column(ForeignKey("permissions.code"), String(64), index=True)

    user = relationship("User", back_populates="permissions")
    permission = relationship("Permission")