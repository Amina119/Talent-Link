import { Routes, Route, Navigate } from "react-router-dom";

import GradientBackground from "./components/GradientBackground";
import ProtectedRoute from "./components/ProtectedRoute";
import PermissionGuard from "./components/PermissionGuard";
import AppShell from "./components/AppShell";

import { PERMS, ROUTES } from "./lib/constants";

import Landing from "./pages/public/Landing";
import Features from "./pages/public/Features";
import HowItWorks from "./pages/public/HowItWorks";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/app/Dashboard";
import Profile from "./pages/app/Profile";
import ProjectsList from "./pages/app/ProjectsList";
import TalentsSearch from "./pages/app/TalentsSearch";
import Assessments from "./pages/app/Assessments";
import Feedback from "./pages/app/Feedback";
import Settings from "./pages/app/Settings";

import UsersAdmin from "./pages/admin/UsersAdmin";
import AuditLogs from "./pages/admin/AuditLogs";

export default function App() {
  return (
    <>
      <GradientBackground />

      <Routes>
        {/* PUBLIC */}
        <Route path={ROUTES.public.landing} element={<Landing />} />
        <Route path={ROUTES.public.features} element={<Features />} />
        <Route path={ROUTES.public.howItWorks} element={<HowItWorks />} />

        {/* AUTH */}
        <Route path={ROUTES.auth.login} element={<Login />} />
        <Route path={ROUTES.auth.register} element={<Register />} />
        <Route path={ROUTES.auth.reset} element={<ResetPassword />} />

        {/* APP SHELL (auth required) */}
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          {/* USER */}
          <Route path={ROUTES.app.dashboard} element={<Dashboard />} />
          <Route path={ROUTES.app.profile} element={<Profile />} />
          <Route path={ROUTES.app.projects} element={<ProjectsList />} />
          <Route path={ROUTES.app.talents} element={<TalentsSearch />} />

          {/* MVP pages */}
          <Route path={ROUTES.app.teams} element={<div>Équipes (à venir)</div>} />
          <Route path={ROUTES.app.messages} element={<div>Messages (à venir)</div>} />
          <Route path={ROUTES.app.notifications} element={<div>Notifications (à venir)</div>} />

          {/* ✅ maintenant vraies pages */}
          <Route path={ROUTES.app.assessments} element={<Assessments />} />
          <Route path={ROUTES.app.feedback} element={<Feedback />} />
          <Route path={ROUTES.app.settings} element={<Settings />} />

          {/* ADMIN (same app, extra options only) */}
          <Route
            path={ROUTES.admin.users}
            element={
              <PermissionGuard perm={PERMS.ADMIN_USERS}>
                <UsersAdmin />
              </PermissionGuard>
            }
          />
          <Route
            path={ROUTES.admin.audit}
            element={
              <PermissionGuard perm={PERMS.ADMIN_AUDIT}>
                <AuditLogs />
              </PermissionGuard>
            }
          />

          {/* fallback inside AppShell */}
          <Route path="*" element={<Navigate to={ROUTES.app.dashboard} replace />} />
        </Route>

        {/* fallback global */}
        <Route path="*" element={<Navigate to={ROUTES.public.landing} replace />} />
      </Routes>
    </>
  );
}
