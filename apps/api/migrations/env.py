from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from sqlalchemy import create_engine
from alembic import context

# Import de tes modèles et de la configuration
from app.core.config import settings
from app.db.base import Base  # Base doit contenir tous tes modèles SQLAlchemy

# Alembic Config object
config = context.config

# Configure les logs
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Target metadata pour autogenerate
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations en mode 'offline' (sans engine)."""
    url = settings.DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations en mode 'online' (avec engine)."""
    connectable = create_engine(
        settings.DATABASE_URL,
        connect_args={"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {},
        poolclass=pool.NullPool
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
