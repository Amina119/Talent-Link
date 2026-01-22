/* =======================
   Types
======================= */

export type JwtPayload = {
  sub: string;
  role: string;
  perms: string[];
  exp: number;
  iat?: number;
};

/* =======================
   Decode
======================= */

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);
    const payload = JSON.parse(jsonPayload);

    return {
      sub: payload.sub,
      role: payload.role ?? "user",
      perms: Array.isArray(payload.perms) ? payload.perms : [],
      exp: payload.exp,
      iat: payload.iat,
    };
  } catch {
    return null;
  }
}

/* =======================
   Helpers
======================= */

export function isTokenExpired(payload: JwtPayload): boolean {
  if (!payload.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

export function getTokenRole(token: string): string | null {
  const payload = decodeJwt(token);
  return payload?.role ?? null;
}

export function getTokenPermissions(token: string): string[] {
  const payload = decodeJwt(token);
  return payload?.perms ?? [];
}
