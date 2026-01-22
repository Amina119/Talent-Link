"""Merge heads

Revision ID: 7e0a900529e9
Revises: 8446c54ae9a9, add_project_team_table
Create Date: 2026-01-22 07:11:36.667696

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7e0a900529e9'
down_revision: Union[str, Sequence[str], None] = ('8446c54ae9a9', 'add_project_team_table')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
