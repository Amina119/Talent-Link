import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "../lib/auth";
import { ROUTES } from "../lib/constants";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthed()) return <Navigate to={ROUTES.auth.login} replace />;
  return <>{children}</>;
}
