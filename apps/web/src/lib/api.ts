export type ApiError = { status: number; message: string };

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getAccessToken() {
  return localStorage.getItem("access_token");
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers || {});

  const isFormData = init.body instanceof FormData;
  if (!isFormData) headers.set("Content-Type", "application/json");

  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });

  if (!res.ok) {
    const text = await res.text();
    let msg = text || "Erreur";

    try {
      const j = JSON.parse(text);
      msg = j.detail || j.message || msg;
    } catch {}

    throw { status: res.status, message: msg } as ApiError;
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
