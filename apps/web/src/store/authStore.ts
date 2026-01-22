import { create } from "zustand";

export type AuthUser = {
  id?: string;
  email?: string;
  full_name?: string;
  role?: string;
  permissions?: string[];
};

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;

  setAuth: (token: string, user?: AuthUser | null) => void;
  setUser: (user: AuthUser | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access_token"),
  user: null,

  setAuth: (token, user = null) => {
    localStorage.setItem("access_token", token);
    set({ accessToken: token, user });
  },

  setUser: (user) => set({ user }),

  clearAuth: () => {
    localStorage.removeItem("access_token");
    set({ accessToken: null, user: null });
  },
}));
