from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.deps import require_perm
from app.models.audit_log import AuditLog

router = APIRouter()

@router.get("/audit-logs")
def audit_logs(
    limit: int = Query(50, ge=1, le=200),
    action: str | None = None,
    db: Session = Depends(get_db),
    _admin=Depends(require_perm("ADMIN_AUDIT")),
):
    q = db.query(AuditLog).order_by(AuditLog.created_at.desc())
    if action:
        q = q.filter(AuditLog.action == action)
    rows = q.limit(limit).all()
    return [{
        "id": r.id,
        "actor_user_id": r.actor_user_id,
        "action": r.action,
        "target_type": r.target_type,
        "target_id": r.target_id,
        "meta_json": r.meta_json,
        "created_at": str(r.created_at),
    } for r in rows]
