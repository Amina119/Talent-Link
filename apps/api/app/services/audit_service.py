import json
from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog

def log(db: Session, actor_user_id: int | None, action: str, target_type: str = "", target_id: str = "", meta: dict | None = None):
    entry = AuditLog(
        actor_user_id=actor_user_id,
        action=action,
        target_type=target_type,
        target_id=str(target_id or ""),
        meta_json=json.dumps(meta or {}, ensure_ascii=False),
    )
    db.add(entry)
    db.commit()