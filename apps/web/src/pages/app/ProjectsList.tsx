import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import { toast } from "../../store/toast";

// Mocked projects pour MVP
type Project = {
  id: string;
  title: string;
  status: "Ouvert" | "En cours" | "Clôturé";
  skills: string[];
  budget?: string;
  updatedAt: string;
  matches: number; // nombre de profils recommandés
};

const MOCK_PROJECTS: Project[] = Array.from({ length: 5 }, (_, i) => ({
  id: `p${i + 1}`,
  title: `Projet ${["Alpha","Beta","Gamma","Delta","Epsilon"][i]}`,
  status: ["Ouvert", "En cours", "Clôturé"][i % 3] as Project["status"],
  skills: ["React","FastAPI","PostgreSQL","UI/UX"].slice(0, 2 + (i % 3)),
  budget: `${200 + i * 100}$`,
  updatedAt: `2026-01-${10 - i}`,
  matches: 25, // MVP: toujours 25 talents recommandés
}));

export default function ProjectsList() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"Tous" | Project["status"]>("Tous");
  const [projects] = useState<Project[]>(MOCK_PROJECTS);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      const okQ =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.skills.some((s) => s.toLowerCase().includes(query));
      const okS = status === "Tous" ? true : p.status === status;
      return okQ && okS;
    });
  }, [projects, q, status]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Projets</h1>
          <p className="mt-2 text-white/70">Crée, gère et lance le matching.</p>
        </div>

        <Button onClick={() => navigate("/app/projects/create")}>+ Nouveau</Button>
      </div>

      {/* Filtrage */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="Rechercher (titre ou skill)…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <label className="block">
            <div className="mb-1 text-xs font-medium text-white/70">Statut</div>
            <select
              className="w-full rounded-2xl bg-white/10 p-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-400/40"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="Tous">Tous</option>
              <option value="Ouvert">Ouvert</option>
              <option value="En cours">En cours</option>
              <option value="Clôturé">Clôturé</option>
            </select>
          </label>
        </div>
      </div>

      {/* Liste projets */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-white/60">Mis à jour : {p.updatedAt}</div>
                <div className="mt-1 text-xl font-semibold">{p.title}</div>
              </div>
              <Badge>{p.status}</Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-white/60">Budget : {p.budget || "—"}</div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/app/projects/${p.id}`)}
                >
                  Détails
                </Button>
                <Button
                  onClick={() => navigate(`/app/projects/${p.id}/matching`)}
                >
                  Matching
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
          Aucun projet trouvé.
        </div>
      )}
    </div>
  );
}
