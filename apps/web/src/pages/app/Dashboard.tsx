import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { toast } from "../../store/toast";
import { useState } from "react";

// Mocked projects et notifications pour MVP
const MOCK_PROJECTS = [
  { id: "p1", title: "Projet Alpha", status: "Ouvert", matches: 3 },
  { id: "p2", title: "Projet Beta", status: "Fermé", matches: 2 },
];

const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "invitation", body: "Amina t’a invité sur Projet Alpha", at: "Aujourd’hui" },
  { id: "n2", type: "match", body: "3 talents recommandés pour Projet Alpha", at: "Hier" },
  { id: "n3", type: "feedback", body: "David t’a laissé une note (4★)", at: "Cette semaine" },
];

export default function Dashboard() {
  const [projects] = useState(MOCK_PROJECTS);
  const [notifications] = useState(MOCK_NOTIFICATIONS);

  const stats = [
    { label: "Projets actifs", value: projects.filter((p) => p.status === "Ouvert").length },
    { label: "Matches dispo", value: projects.reduce((acc, p) => acc + p.matches, 0) },
    { label: "Invitations", value: notifications.filter((n) => n.type === "invitation").length },
    { label: "Crédibilité", value: "84" }, // mock
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Dashboard</h1>
          <p className="mt-2 text-white/70">
            Vue d’ensemble : projets, matching, équipe et crédibilité.
          </p>
        </div>

        {/* Top actions */}
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => toast.info("Sync GitHub : à brancher au backend.")}>
            Sync GitHub
          </Button>
          <Button onClick={() => toast.info("Créer projet : va sur /app/projects/create")}>
            Nouveau projet
          </Button>
          <Button variant="ghost" onClick={() => toast.info("Profil utilisateur : à brancher.")}>
            Profil
          </Button>
          <Button variant="ghost" onClick={() => toast.info("Logout : à brancher.")}>
            Logout
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">{s.label}</div>
            <div className="mt-2 text-3xl font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Actions rapides</div>
          <div className="mt-4 space-y-2">
            <Button className="w-full" onClick={() => toast.info("Ouvre Talents : /app/talents")}>
              Chercher des talents
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => toast.info("Voir matching : /app/projects/{projectId}/matching")}
            >
              Voir matching
            </Button>
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => toast.info("Ouvre Notifications : /app/notifications")}
            >
              Notifications
            </Button>
          </div>
        </section>

        {/* Recent activity */}
        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Activité récente</div>
            <Badge>MVP</Badge>
          </div>
          <div className="mt-4 space-y-3">
            {notifications.map((a) => (
              <div key={a.id} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="font-medium">
                    {a.type === "match" ? "Nouveau match" : a.type === "feedback" ? "Feedback" : "Invitation"}
                  </div>
                  <div className="mt-1 text-sm text-white/70">{a.body}</div>
                  <div className="text-xs text-white/50">{a.at}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
