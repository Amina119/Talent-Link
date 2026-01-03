export type JwtPayload = {
  sub: string;
  role?: string;
  perms?: string[];
  exp?: number;
  iat?: number;
};

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const part = token.split(".")[1];
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}