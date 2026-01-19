from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext

from .config import settings


pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_access_token(sub: str) -> str:
    now = datetime.now(timezone.utc)


    expire_minutes = getattr(settings, "ACCESS_TOKEN_MINUTES", 60)

    exp = now + timedelta(minutes=int(expire_minutes))
    payload = {
        "sub": sub,
        "iat": int(now.timestamp()),
        "exp": int(exp.timestamp()),
    }

    alg = getattr(settings, "JWT_ALG", "HS256")
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=alg)


def decode_token(token: str) -> dict:
    alg = getattr(settings, "JWT_ALG", "HS256")
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[alg])
