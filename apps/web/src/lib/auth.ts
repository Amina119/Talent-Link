import { apiFetch } from "./api";
import { useAuthStore } from "../store/authStore";
import type { Availability } from "./constants";

export type AuthUser = {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  permissions: string[];

  profession?: string;
  skills?: string[];
  availability?: Availability;
};

type AuthResponse = {
  access_token: string;
  user: AuthUser;
};


export function isAuthed(): boolean {
  return !!localStorage.getItem("access_token");
}

export function logout() {
  localStorage.removeItem("access_token");
  useAuthStore.getState().clearAuth();
}

export async function login(email: string, password: string) {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("access_token", data.access_token);
  useAuthStore.getState().setAuth(data.access_token, data.user);

  return data;
}

export async function register(
  email: string,
  password: string,
  fullName: string,
  profile?: {
    profession?: string;
    skills?: string[];
    availability?: Availability;
  }
) {
  const payload = {
    email,
    password,
    full_name: fullName,
    ...profile,
  };

  const data = await apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  localStorage.setItem("access_token", data.access_token);
  useAuthStore.getState().setAuth(data.access_token, data.user);

  return data;
}

export async function fetchMe() {
  const user = await apiFetch<AuthUser>("/auth/me");
  useAuthStore.getState().setUser(user);
  return user;
}
