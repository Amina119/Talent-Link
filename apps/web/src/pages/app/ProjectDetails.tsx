import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { toast } from "../../store/toast";
import { api } from "../../lib/api";

type Project = {
  id: string;
  title: string;
  status: "Ouvert" | "En cours" | "Clôturé";
  skills: string[];
  description: string;
};

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    setLoading(true);
    api<Project>(`/projects/${projectId}`)
      .then((data) => setProject(data))
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <p className="text-white/70">Chargement…</p>;
  if (error) return <p className="text-red-400">Erreur : {error}</p>;
  if (!project) return <p className="text-white/70">Projet introuvable</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">{project.title}</h1>
          <p className="mt-2 text-white/70">Détails du projet et actions disponibles.</p>
        </div>
        <Badge>{project.status}</Badge>
      </div>

      {/* Contenu */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Description & Compétences */}
        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Description</div>
          <div className="mt-2 text-white/80">{project.description}</div>

          <div className="mt-6 text-sm text-white/60">Compétences requises</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </section>

        {/* Actions */}
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Actions</div>
          <div className="mt-4 space-y-2">
            <Button
              className="w-full"
              onClick={() => navigate(`/app/projects/${project.id}/matching`)}
            >
              Voir Matching
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => toast.info("Édition projet : à venir.")}
            >
              Modifier
            </Button>
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => toast.error("Suppression : à venir (protégée).")}
            >
              Supprimer
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
