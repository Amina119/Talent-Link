import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { hasPerm, isAdmin } from "../lib/rbac";
import { ROUTES, type PermissionCode } from "../lib/constants";
import { uiStore } from "../store/uiStore";

type Props = {
  perm: PermissionCode;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function PermissionGuard({ perm, children, fallback }: Props) {
  const user = useAuthStore((s) => s.user);
  const addToast = uiStore((s) => s.addToast);

  // Si pas connecté → redirection vers login
  if (!user) return <Navigate to={ROUTES.auth.login} replace />;

  // Si admin → accès direct
  if (isAdmin(user)) return <>{children}</>;

  // Vérifie permission spécifique
  if (!hasPerm(user, perm)) {
    // Affiche toast seulement si pas fallback
    useEffect(() => {
      if (!fallback) addToast("Vous n'avez pas la permission pour accéder à cette page.", "error");
    }, [addToast, fallback]);

    if (fallback) return <>{fallback}</>;
    return <Navigate to={ROUTES.app.dashboard} replace />;
  }

  // Si tout est ok → render children
  return <>{children}</>;
}
