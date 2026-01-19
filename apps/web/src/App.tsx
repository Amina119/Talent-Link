import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "./lib/constants";

/* Public pages */
import Landing from "./pages/public/Landing";
import Features from "./pages/public/Features";
import HowItWorks from "./pages/public/HowItWorks";

/* Auth pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* App pages */
import Dashboard from "./pages/app/Dashboard";
import Profile from "./pages/app/Profile";
import TalentsSearch from "./pages/app/TalentsSearch";
import ProjectsList from "./pages/app/ProjectsList";
import Teams from "./pages/app/Teams";
import Notifications from "./pages/app/Notifications";
import Assessments from "./pages/app/Assessments";
import Feedback from "./pages/app/Feedback";
import Settings from "./pages/app/Settings";

/* Admin pages */
import UsersAdmin from "./pages/admin/UsersAdmin";
import AuditLogs from "./pages/admin/AuditLogs";

/* Guards / layout */
import ProtectedRoute from "./components/ProtectedRoute";
import PermissionGuard from "./components/PermissionGuard";
import AppShell from "./components/AppShell";

/* ---------------------------------------
   Error Boundary (anti écran blanc)
----------------------------------------*/
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("🔥 React render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-xl font-semibold">Une erreur est survenue</h1>
            <p className="mt-1 text-sm text-white/70">
              Une page a crashé pendant le rendu (c’est pour ça que tu voyais tout
              blanc).
            </p>

            <div className="mt-4 rounded-xl bg-black/40 border border-red-500/20 p-3">
              <pre className="text-xs text-red-300 whitespace-pre-wrap">
                {this.state.error?.message}
              </pre>
            </div>

            <button
              className="mt-4 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-sm"
              onClick={() => window.location.reload()}
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* ---------------------------------------
   App Routes
----------------------------------------*/
export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* PUBLIC */}
        <Route path={ROUTES.public.landing} element={<Landing />} />
        <Route path={ROUTES.public.features} element={<Features />} />
        <Route path={ROUTES.public.howItWorks} element={<HowItWorks />} />

        {/* AUTH */}
        <Route path={ROUTES.auth.login} element={<Login />} />
        <Route path={ROUTES.auth.register} element={<Register />} />
        {/* reset optionnel */}
        <Route
          path={ROUTES.auth.reset}
          element={<div className="min-h-screen bg-black text-white p-8">Reset</div>}
        />

        {/* APP (protégé) */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          {/* redirection /app -> /app/dashboard */}
          <Route index element={<Navigate to={ROUTES.app.dashboard} replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="talents" element={<TalentsSearch />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="teams" element={<Teams />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="settings" element={<Settings />} />

          {/* si tu ajoutes la page messages plus tard */}
          {/* <Route path="messages" element={<Messages />} /> */}
        </Route>

        {/* ADMIN (protégé + permission) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route
            path="users"
            element={
              <PermissionGuard perm="admin:users">
                <UsersAdmin />
              </PermissionGuard>
            }
          />
          <Route
            path="audit"
            element={
              <PermissionGuard perm="admin:audit">
                <AuditLogs />
              </PermissionGuard>
            }
          />

          {/* matching/moderation pages si existantes */}
          {/* <Route path="matching" element={...} /> */}
          {/* <Route path="moderation" element={...} /> */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to={ROUTES.public.landing} replace />} />
      </Routes>
    </ErrorBoundary>
  );
}
