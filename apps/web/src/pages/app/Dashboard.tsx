import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { toast } from "../../store/toast";

export default function Dashboard() {
  const stats = [
    { label: "Projets actifs", value: "2" },
    { label: "Matches dispo", value: "7" },
    { label: "Invitations", value: "1" },
    { label: "Crédibilité", value: "84" },
  ];

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Dashboard</h1>
          <p className="mt-2 text-white/70">
            Vue d’ensemble : projets, matching, équipe et crédibilité.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => toast.info("Sync GitHub : à brancher au backend.")}
          >
            Sync GitHub
          </Button>
          <Button onClick={() => toast.info("Créer projet : va sur /app/projects (bouton +).")}>
            Nouveau projet
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">{s.label}</div>
            <div className="mt-2 text-3xl font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Quick actions */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Actions rapides</div>
          <div className="mt-4 space-y-2">
            <Button className="w-full" onClick={() => toast.info("Ouvre Talents : /app/talents")}>
              Chercher des talents
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => toast.info("Ouvre Matching : /app/projects/matching (MVP).")}
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
            {[
              { title: "Invitation reçue", body: "Amina t’a invité sur Projet Alpha", at: "Aujourd’hui" },
              { title: "Nouveaux matchs", body: "3 talents recommandés pour Projet Alpha", at: "Hier" },
              { title: "Feedback", body: "David t’a laissé une note (4★)", at: "Cette semaine" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="mt-1 text-sm text-white/70">{a.body}</div>
                  </div>
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
