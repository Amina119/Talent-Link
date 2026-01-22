import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES, PERMS } from "./lib/constants";


import Landing from "./pages/public/Landing";
import Features from "./pages/public/Features";
import HowItWorks from "./pages/public/HowItWorks";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/app/Dashboard";
import Profile from "./pages/app/Profile";
import TalentsSearch from "./pages/app/TalentsSearch";
import ProjectsList from "./pages/app/ProjectsList";
import Teams from "./pages/app/Teams";
import Notifications from "./pages/app/Notifications";
import Assessments from "./pages/app/Assessments";
import Feedback from "./pages/app/Feedback";
import Settings from "./pages/app/Settings";


import UsersAdmin from "./pages/admin/UsersAdmin";
import AuditLogs from "./pages/admin/AuditLogs";

import ProtectedRoute from "./components/ProtectedRoute";
import PermissionGuard from "./components/PermissionGuard";
import AppShell from "./components/AppShell";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path={ROUTES.public.landing} element={<Landing />} />
      <Route path={ROUTES.public.features} element={<Features />} />
      <Route path={ROUTES.public.howItWorks} element={<HowItWorks />} />

      {/* AUTH */}
      <Route path={ROUTES.auth.login} element={<Login />} />
      <Route path={ROUTES.auth.register} element={<Register />} />
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
        {/* /app -> /app/dashboard */}
        <Route index element={<Navigate to={ROUTES.app.dashboard} replace />} />

        {/* Routes enfants (relatives) */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="talents" element={<TalentsSearch />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="teams" element={<Teams />} />
        <Route path="notifications" element={<Notifications />} />

        {/* Assessments OK (tu veux 10 questions: on fera dans la page) */}
        <Route path="assessments" element={<Assessments />} />

        <Route path="feedback" element={<Feedback />} />
        <Route path="settings" element={<Settings />} />

        {/* ✅ Messages: tu veux supprimer -> donc pas de route */}
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
            <PermissionGuard perm={PERMS.ADMIN_USERS}>
              <UsersAdmin />
            </PermissionGuard>
          }
        />
        <Route
          path="audit"
          element={
            <PermissionGuard perm={PERMS.ADMIN_AUDIT}>
              <AuditLogs />
            </PermissionGuard>
          }
        />

        {/* matching/moderation plus tard si pages existent */}
        {/* <Route path="matching" element={...} /> */}
        {/* <Route path="moderation" element={...} /> */}
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to={ROUTES.public.landing} replace />} />
    </Routes>
  );
}
