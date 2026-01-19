import { apiFetch } from "./api";
import { useAuthStore } from "../store/authStore";

export type AuthUser = {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  permissions: string[];
};

type AuthOut = {
  access_token: string;
  user: AuthUser;
};

export function isAuthed() {
  return !!localStorage.getItem("access_token");
}

export function logout() {
  useAuthStore.getState().clearAuth();
}

/**
 * backend: POST /auth/login
 * payload: { email, password }
 */
export async function login(email: string, password: string) {
  const data = await apiFetch<AuthOut>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  useAuthStore.getState().setAuth(data.access_token, data.user);
  return data;
}

/**
 * backend: POST /auth/register
 * payload: { email, password, full_name? }
 */
export async function register(email: string, password: string, fullName?: string) {
  const payload: { email: string; password: string; full_name?: string } = { email, password };

  const clean = fullName?.trim();
  if (clean) payload.full_name = clean;

  const data = await apiFetch<AuthOut>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  useAuthStore.getState().setAuth(data.access_token, data.user);
  return data;
}

/**
 * backend: GET /auth/me
 */
export async function fetchMe() {
  const user = await apiFetch<AuthUser>("/auth/me");
  useAuthStore.getState().setUser(user);
  return user;
}
