import { decodeJwt } from "./jwt";

/**
 * Récupère la liste des permissions depuis le token JWT
 */
export function getPerms(): string[] {
  const t = localStorage.getItem("access_token");
  if (!t) return [];
  // Le cast 'as any' évite les erreurs de typage si l'interface du token n'est pas définie
  const decoded = decodeJwt(t) as any;
  return decoded?.perms ?? [];
}

/**
 * Vérifie si l'utilisateur possède une permission spécifique
 */
export function hasPerm(code: string): boolean {
  const perms = getPerms();
  return Array.isArray(perms) && perms.includes(code);
}

/**
 * Récupère le rôle de l'utilisateur (admin, user, guest, etc.)
 */
export function getRole(): string {
  const t = localStorage.getItem("access_token");
  if (!t) return "guest";
  const decoded = decodeJwt(t) as any;
  return decoded?.role ?? "user";
}

/**
 * Helper rapide pour vérifier si l'utilisateur est administrateur
 */
export function isAdmin(): boolean {
  return getRole() === "admin";
}