

PERMS = {
    "APP_READ": "APP_READ",
    "ADMIN_USERS": "ADMIN_USERS",
    "ADMIN_AUDIT": "ADMIN_AUDIT",
    "ADMIN_MATCHING": "ADMIN_MATCHING",
}

ROLE_DEFAULT_PERMS = {
    "user": [PERMS["APP_READ"]],
    "admin": [PERMS["APP_READ"], PERMS["ADMIN_USERS"], PERMS["ADMIN_AUDIT"], PERMS["ADMIN_MATCHING"]],
}

ADMIN_DEFAULT_PERMS = ROLE_DEFAULT_PERMS["admin"]

def get_role_perms(role: str) -> list[str]:
    return ROLE_DEFAULT_PERMS.get(role, [PERMS["APP_READ"]])
