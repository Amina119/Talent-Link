export const APP = {
  name: "TalentLink",
  tagline: "Build your dream team with smart matching.",
};

export const ROUTES = {
  public: {
    landing: "/",
    features: "/features",
    howItWorks: "/how-it-works",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    reset: "/auth/reset",
  },
  app: {
    dashboard: "/app/dashboard",
    profile: "/app/profile",
    talents: "/app/talents",
    projects: "/app/projects",
    teams: "/app/teams",
    messages: "Messages",
    notifications: "/app/notifications",
    assessments: "/app/assessments",
    feedback: "/app/feedback",
    settings: "/app/settings",
  },
  admin: {
    users: "/admin/users",
    audit: "/admin/audit",
    matching: "/admin/matching",
    moderation: "/admin/moderation",
  },
};

export const PERMS = {
  ADMIN_USERS: "ADMIN_USERS",
  ADMIN_AUDIT: "ADMIN_AUDIT",
  ADMIN_MATCHING_CONFIG: "ADMIN_MATCHING_CONFIG",
  ADMIN_MODERATION: "ADMIN_MODERATION",
} as const;

export type PermissionCode = (typeof PERMS)[keyof typeof PERMS];
export const NAV = {
  user: [
    { to: ROUTES.app.dashboard, label: "Dashboard" },
    { to: ROUTES.app.profile, label: "My Profile" },
    { to: ROUTES.app.projects, label: "Projects" },
    { to: ROUTES.app.talents, label: "Talents" },
    { to: ROUTES.app.teams, label: "Teams" },
    { to: ROUTES.app.notifications, label: "Notifications" },
    { to: ROUTES.app.settings, label: "Settings" },
  ],
  admin: [
    { to: ROUTES.admin.users, label: "Users", perm: PERMS.ADMIN_USERS },
    { to: ROUTES.admin.audit, label: "Audit Logs", perm: PERMS.ADMIN_AUDIT },
    { to: ROUTES.admin.matching, label: "Matching Config", perm: PERMS.ADMIN_MATCHING_CONFIG },
    { to: ROUTES.admin.moderation, label: "Moderation", perm: PERMS.ADMIN_MODERATION },
  ],
};

export const UI = {
  motion: {
    fast: 0.15,
    base: 0.25,
    slow: 0.4,
  },
  toast: {
    durationMs: 3000,
  },
  limits: {
    bioMax: 800,
    nameMax: 120,
    passwordMin: 8,
  },
};
export const AVAILABILITY = ["available", "busy", "part-time"] as const;
export type Availability = (typeof AVAILABILITY)[number];
