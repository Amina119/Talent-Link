import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { toast } from "../../store/toast";

export default function ProjectDetails() {

  const project = {
    title: "Projet Alpha",
    status: "Ouvert",
    skills: ["React", "FastAPI", "PostgreSQL", "UI/UX"],
    description: "Plateforme TalentLink: matching, teams, feedback, GitHub.",
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">{project.title}</h1>
          <p className="mt-2 text-white/70">Détails du projet (MVP).</p>
        </div>
        <Badge>{project.status}</Badge>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Description</div>
          <div className="mt-2 text-white/80">{project.description}</div>

          <div className="mt-6 text-sm text-white/60">Compétences</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Actions</div>
          <div className="mt-4 space-y-2">
            <Button className="w-full" onClick={() => toast.info("Matching: page dédiée /app/projects/matching (à brancher).")}>
              Voir matching
            </Button>
            <Button className="w-full" variant="secondary" onClick={() => toast.info("Edition projet : à venir.")}>
              Modifier
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => toast.error("Suppression : à venir (protégée).")}>
              Supprimer
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
