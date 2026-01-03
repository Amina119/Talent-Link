from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.security import hash_password
from app.core.rbac import ADMIN_DEFAULT_PERMS
from app.models.user import User
from app.models.profile import Profile
from app.models.permission import Permission
from app.models.user_permission import UserPermission

def seed(db: Session):

    for code, desc in ADMIN_DEFAULT_PERMS:
        if not db.get(Permission, code):
            db.add(Permission(code=code, description=desc))
    db.commit()

    admin = db.query(User).filter(User.email == settings.SEED_ADMIN_EMAIL).first()
    if not admin:
        admin = User(
            email=settings.SEED_ADMIN_EMAIL,
            full_name="System Admin",
            password_hash=hash_password(settings.SEED_ADMIN_PASSWORD),
            role="admin",
            is_active=True,
        )
        db.add(admin)
        db.flush()
        db.add(Profile(user_id=admin.id))
        db.commit()


    existing = {up.permission_code for up in admin.permissions}
    for code, _ in ADMIN_DEFAULT_PERMS:
        if code not in existing:
            db.add(UserPermission(user_id=admin.id, permission_code=code))
    db.commit()
