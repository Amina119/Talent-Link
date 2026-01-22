import { NavLink } from "react-router-dom";
import { PERMS, ROUTES } from "../lib/constants";
import { hasPerm } from "../lib/rbac";

const userNav = [
  { to: ROUTES.app.dashboard, label: "Tableau de bord" },
  { to: ROUTES.app.profile, label: "Mon profil" },
  { to: ROUTES.app.projects, label: "Projets" },
  { to: ROUTES.app.talents, label: "Talents" },
  { to: ROUTES.app.teams, label: "Équipes" },
  { to: ROUTES.app.messages, label: "Messages" },
  { to: ROUTES.app.notifications, label: "Notifications" },
  { to: ROUTES.app.settings, label: "Paramètres" },
];

const adminNav = [
  { to: ROUTES.admin.users, label: "Utilisateurs", perm: PERMS.ADMIN_USERS },
  { to: ROUTES.admin.audit, label: "Audit", perm: PERMS.ADMIN_AUDIT },
  { to: ROUTES.admin.matching, label: "Matching", perm: PERMS.ADMIN_MATCHING_CONFIG },
  { to: ROUTES.admin.moderation, label: "Modération", perm: PERMS.ADMIN_MODERATION },
];

export default function Sidebar() {
  const visibleAdmin = adminNav.filter((i) => hasPerm(i.perm));
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-2xl px-3 py-2 text-sm transition ${
      isActive ? "bg-white/10" : "hover:bg-white/5"
    }`;

  return (
    <aside className="w-72 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-6">
        <div className="font-display text-lg">TalentLink</div>
        <div className="text-xs text-white/60">Matching • Projets • Collaboration</div>
      </div>

      <div className="text-xs font-semibold text-white/60">APPLICATION</div>
      <nav className="mt-2 space-y-1">
        {userNav.map((i) => (
          <NavLink key={i.to} to={i.to} className={linkClass}>
            {i.label}
          </NavLink>
        ))}
      </nav>

      {visibleAdmin.length > 0 && (
        <>
          <div className="mt-6 text-xs font-semibold text-white/60">ADMIN (OPTIONS EN PLUS)</div>
          <nav className="mt-2 space-y-1">
            {visibleAdmin.map((i) => (
              <NavLink key={i.to} to={i.to} className={linkClass}>
                {i.label}
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
}
