from sqlalchemy import String, Float
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class MatchingConfig(Base):
    __tablename__ = "matching_config"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    w_skills: Mapped[float] = mapped_column(Float, default=0.6)
    w_credibility: Mapped[float] = mapped_column(Float, default=0.4)
