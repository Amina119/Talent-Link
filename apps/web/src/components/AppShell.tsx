import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES, PERMS } from "../lib/constants";
import { useAuthStore } from "../store/authStore";
import { hasPerm, isAdmin } from "../lib/rbac";

type NavItem = {
  label: string;
  to: string;
  emoji?: string;
  perm?: string; 
};

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const userItems: NavItem[] = [
    { label: "Dashboard", to: ROUTES.app.dashboard, emoji: "🏠" },
    { label: "Mon Profil", to: ROUTES.app.profile, emoji: "👤" },
    { label: "Projets", to: ROUTES.app.projects, emoji: "📌" },
    { label: "Talents", to: ROUTES.app.talents, emoji: "🔎" },
    { label: "Équipes", to: ROUTES.app.teams, emoji: "👥" },
    { label: "Messages", to: ROUTES.app.messages, emoji: "💬" },
    { label: "Notifications", to: ROUTES.app.notifications, emoji: "🔔" },
    { label: "Assessments", to: ROUTES.app.assessments, emoji: "🧠" },
    { label: "Feedback", to: ROUTES.app.feedback, emoji: "⭐" },
    { label: "Settings", to: ROUTES.app.settings, emoji: "⚙️" },
  ];

  const adminItems: NavItem[] = [
    { label: "Admin — Users", to: ROUTES.admin.users, emoji: "🛡️", perm: PERMS.ADMIN_USERS },
    { label: "Admin — Audit logs", to: ROUTES.admin.audit, emoji: "📋", perm: PERMS.ADMIN_AUDIT },
  ];

  const canSeeAdminSection =
    user ? isAdmin(user) || adminItems.some((it) => !it.perm || hasPerm(user, it.perm)) : false;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Topbar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(ROUTES.public.landing)}
              className="text-sm font-semibold tracking-tight hover:text-white/90"
            >
              Talent<span className="text-blue-400">Link</span>
            </button>

            <span className="hidden text-xs text-white/60 md:inline">
              {prettyRouteName(location.pathname)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right text-xs text-white/70 md:block">
              <div className="font-medium text-white/90">{user?.email ?? "Utilisateur"}</div>
              <div className="text-white/60">{user?.role ?? "member"}</div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate(ROUTES.public.landing);
              }}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-4">
            <div className="text-xs font-semibold text-white/70">MENU</div>
          </div>

          <nav className="space-y-1">
            {userItems.map((item) => (
              <SideLink key={item.to} to={item.to} label={item.label} emoji={item.emoji} />
            ))}
          </nav>

          {canSeeAdminSection && (
            <>
              <div className="my-5 border-t border-white/10" />

              <div className="mb-3 text-xs font-semibold text-white/70">ADMIN</div>
              <nav className="space-y-1">
                {adminItems
                  .filter((it) => {
                    if (!user) return false;
                    if (isAdmin(user)) return true;
                    if (!it.perm) return true;
                    return hasPerm(user, it.perm);
                  })
                  .map((item) => (
                    <SideLink key={item.to} to={item.to} label={item.label} emoji={item.emoji} />
                  ))}
              </nav>
            </>
          )}
        </aside>

        {/* Content */}
        <main className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SideLink({
  to,
  label,
  emoji,
}: {
  to: string;
  label: string;
  emoji?: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
          isActive
            ? "bg-blue-600/15 text-white border border-blue-500/20"
            : "text-white/80 hover:bg-white/10 hover:text-white",
        ].join(" ")
      }
    >
      <span className="w-5 text-center">{emoji ?? "•"}</span>
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

function prettyRouteName(pathname: string) {
  if (pathname.startsWith("/app/admin")) return "Administration";
  if (pathname.includes("/dashboard")) return "Dashboard";
  if (pathname.includes("/profile")) return "Profil";
  if (pathname.includes("/projects")) return "Projets";
  if (pathname.includes("/talents")) return "Talents";
  if (pathname.includes("/teams")) return "Équipes";
  if (pathname.includes("/messages")) return "Messages";
  if (pathname.includes("/notifications")) return "Notifications";
  if (pathname.includes("/assessments")) return "Assessments";
  if (pathname.includes("/feedback")) return "Feedback";
  if (pathname.includes("/settings")) return "Paramètres";
  return "Application";
}
