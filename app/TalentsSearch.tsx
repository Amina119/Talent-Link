import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import { toast } from "../../store/toast";

type Talent = {
  id: string;
  name: string;
  headline: string;
  credibility: number;
  skills: string[];
  location?: string;
};

const seed: Talent[] = [
  { id: "t1", name: "Amina K.", headline: "Frontend • UI/UX", credibility: 84, skills: ["React", "TypeScript", "Figma"], location: "Douala" },
  { id: "t2", name: "David S.", headline: "Backend • APIs", credibility: 76, skills: ["FastAPI", "PostgreSQL", "Docker"], location: "Yaoundé" },
  { id: "t3", name: "Junior X.", headline: "Junior Dev", credibility: 61, skills: ["React"], location: "Bafoussam" },
];

export default function TalentsSearch() {
  const [q, setQ] = useState("");
  const [minCred, setMinCred] = useState(0);
  const [items] = useState<Talent[]>(seed);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((t) => {
      const okQ =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.headline.toLowerCase().includes(query) ||
        t.skills.some((s) => s.toLowerCase().includes(query));
      const okC = t.credibility >= minCred;
      return okQ && okC;
    });
  }, [items, q, minCred]);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Talents</h1>
          <p className="mt-2 text-white/70">
            Recherche de profils + crédibilité + skills (MVP).
          </p>
        </div>

        <Button variant="secondary" onClick={() => toast.info("Sync GitHub talents : bonus (backend).")}>
          Sync GitHub
        </Button>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="Rechercher (nom, headline, skill)…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <label className="block">
            <div className="mb-1 text-xs font-medium text-white/70">
              Crédibilité minimale: <span className="font-semibold">{minCred}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={minCred}
              onChange={(e) => setMinCred(Number(e.target.value))}
              className="w-full"
            />
          </label>

          <div className="flex items-end gap-2">
            <Button
              className="w-full"
              onClick={() => toast.info("Filtrage avancé : rôle, dispo, budget (à venir).")}
            >
              Filtres avancés
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-white/60">{t.location || "—"}</div>
                <div className="mt-1 text-xl font-semibold">{t.name}</div>
                <div className="mt-1 text-white/70">{t.headline}</div>
              </div>
              <Badge>Crédibilité {t.credibility}</Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {t.skills.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <Button variant="secondary" onClick={() => toast.info("Détails talent : /app/talents/:id (à relier).")}>
                Profil
              </Button>
              <Button onClick={() => toast.success(`Invitation envoyée à ${t.name} ✅ (MVP)`)}>
                Inviter
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
          Aucun talent trouvé.
        </div>
      )}
    </div>
  );
}
