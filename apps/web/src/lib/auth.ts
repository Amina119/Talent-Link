import { api } from "./api";

export async function register(email: string, password: string, full_name: string) {
  return api<{ message: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, full_name }),
  });
}

export async function login(email: string, password: string) {
  const out = await api<{ access_token: string; refresh_token: string; token_type: string }>(
    "/auth/login",
    { method: "POST", body: JSON.stringify({ email, password }) }
  );
  localStorage.setItem("access_token", out.access_token);
  localStorage.setItem("refresh_token", out.refresh_token);
  return out;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function me() {
  return api<{ id: string; email: string; full_name: string; role: string; perms: string[] }>(
    "/auth/me"
  );
}
