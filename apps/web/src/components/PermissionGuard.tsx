import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { hasPerm, isAdmin } from "../lib/rbac";
import { ROUTES } from "../lib/constants";

type Props = {
  perm: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function PermissionGuard({ perm, children, fallback }: Props) {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to={ROUTES.auth.login} replace />;

  if (isAdmin(user)) return <>{children}</>;

  if (!hasPerm(user, perm)) {
    if (fallback) return <>{fallback}</>;

    return <Navigate to={ROUTES.app.dashboard} replace />;
  }

  return <>{children}</>;
}
