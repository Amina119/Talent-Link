PERMS = {
    "ADMIN_USERS": "ADMIN_USERS",
    "ADMIN_AUDIT": "ADMIN_AUDIT",
    "ADMIN_MATCHING": "ADMIN_MATCHING",
}

ROLE_DEFAULT_PERMS = {
    "user": ["APP_READ"],
    "admin": ["APP_READ", "ADMIN_USERS", "ADMIN_AUDIT", "ADMIN_MATCHING"],
}

def get_role_perms(role: str) -> list[str]:
    return ROLE_DEFAULT_PERMS.get(role, ["APP_READ"]) 