import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { toast } from "../../store/toast";

type Notif = {
  id: string;
  type: "invitation" | "match" | "feedback";
  title: string;
  body: string;
  read: boolean;
  at: string;
};

// Mocked notifications pour MVP
const seed: Notif[] = [
  { id: "n1", type: "invitation", title: "Invitation d’équipe", body: "Amina t’a invité sur Projet Alpha.", read: false, at: "Aujourd’hui" },
  { id: "n2", type: "match", title: "Match disponible", body: "3 talents recommandés pour ton projet.", read: true, at: "Hier" },
  { id: "n3", type: "feedback", title: "Feedback reçu", body: "David t’a laissé une note (4★).", read: false, at: "Cette semaine" },
];

export default function Notifications() {
  const [items, setItems] = useState<Notif[]>(seed);

  const unread = useMemo(() => items.filter((x) => !x.read).length, [items]);

  function markAll() {
    setItems((x) => x.map((n) => ({ ...n, read: true })));
    toast.success("Toutes les notifications marquées comme lues ✅");
  }

  function toggle(id: string) {
    setItems((x) =>
      x.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Notifications</h1>
          <p className="mt-2 text-white/70">Invitations, matching, feedback et alertes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge>{unread} non lues</Badge>
          <Button variant="secondary" onClick={markAll}>
            Tout lire
          </Button>
        </div>
      </div>

      {/* Liste des notifications */}
      <div className="mt-6 space-y-3">
        {items.map((n) => (
          <div
            key={n.id}
            className={`rounded-3xl border border-white/10 p-5 ${
              n.read ? "bg-white/5" : "bg-white/10"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-white/60">{n.at}</div>
                <div className="mt-1 text-lg font-semibold">{n.title}</div>
                <div className="mt-2 text-white/75">{n.body}</div>
              </div>
              <Button variant="ghost" onClick={() => toggle(n.id)}>
                {n.read ? "Marquer non lu" : "Marquer lu"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
