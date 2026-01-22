from alembic import op
import sqlalchemy as sa


# Révisions Alembic
revision = 'add_project_team_table'
down_revision = None  # si c'est la première migration, sinon mets l'ID de la dernière migration
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'project_teams',
        sa.Column('id', sa.String(length=36), primary_key=True),
        sa.Column('project_id', sa.String(length=36), sa.ForeignKey('projects.id', ondelete='CASCADE'), nullable=False),
        sa.Column('user_id', sa.String(length=36), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('role', sa.String(length=50), nullable=True),
        sa.Column('status', sa.String(length=50), default='pending'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint('project_id', 'user_id', name='uq_project_user')
    )


def downgrade():
    op.drop_table('project_teams')
