import { useAuthStore } from "../store/authStore";

export function getRole() {
  return useAuthStore.getState().user?.role || "user";
}

export function hasPerm(perm: string) {
  const perms = useAuthStore.getState().user?.permissions || [];
  return perms.includes(perm);
}

export function isAdmin() {
  const role = getRole();
  return role === "admin" || hasPerm("admin:all");
}
