import { Navigate } from "react-router-dom";
import { hasPerm } from "../lib/rbac";

export default function PermissionGuard({ perm, children }: { perm: string; children: JSX.Element }) {
  if (!hasPerm(perm)) return <Navigate to="/app/dashboard" replace />;
  return children;
}
