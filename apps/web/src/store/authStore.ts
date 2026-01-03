type Listener = () => void;

type AuthState = {
  token: string | null;
  setToken: (t: string | null) => void;
  subscribe: (fn: Listener) => () => void;
};

const listeners = new Set<Listener>();

const state: AuthState = {
  token: localStorage.getItem("access_token"),
  setToken(t) {
    state.token = t;
    if (t) localStorage.setItem("access_token", t);
    else localStorage.removeItem("access_token");
    listeners.forEach((l) => l());
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

export function useAuthStoreSnapshot() {
  return { token: state.token, setToken: state.setToken };
}

export const authStore = state;
