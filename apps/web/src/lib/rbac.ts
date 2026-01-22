import type { AuthUser } from "./auth";
import { useAuthStore } from "../store/authStore";

/**
 * Récupère le rôle de l'utilisateur.
 * @param user Optionnel. Si absent, utilise le user du store.
 */
export function getRole(user?: AuthUser): string {
  const u = user || useAuthStore.getState().user;
  return u?.role || "user";
}

/**
 * Vérifie si l'utilisateur a une permission donnée.
 * @param user Optionnel. Si absent, utilise le user du store.
 */
export function hasPerm(user: AuthUser | undefined, perm: string): boolean {
  const perms = user?.permissions || useAuthStore.getState().user?.permissions || [];
  return perms.includes(perm);
}

/**
 * Vérifie si l'utilisateur est admin.
 * @param user Optionnel. Si absent, utilise le user du store.
 */
export function isAdmin(user?: AuthUser): boolean {
  const role = getRole(user);
  return role === "admin" || hasPerm(user, "admin:all");
}
