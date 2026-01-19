export type ApiError = { status: number; message: string };

const RAW_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const BASE_URL = RAW_BASE.replace(/\/+$/, "");

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function normalizePath(path: string) {
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${normalizePath(path)}`;

  const headers = new Headers(init.headers || {});
  const isFormData = init.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = getAccessToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, { ...init, headers });

  if (!res.ok) {
    const text = await res.text();
    let msg = text || "Erreur";

    try {
      const payload = text ? JSON.parse(text) : null;
      const detail = payload?.detail ?? payload?.message ?? msg;

      if (typeof detail === "string") msg = detail;
      else if (Array.isArray(detail)) msg = detail?.[0]?.msg || JSON.stringify(detail);
      else msg = msg;
    } catch {}

    throw { status: res.status, message: msg } as ApiError;
  }

  if (res.status === 204) return undefined as T;

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return (await res.text()) as unknown as T;

  const body = await res.text();
  if (!body) return undefined as T;

  return JSON.parse(body) as T;
}


export const api = apiFetch;
