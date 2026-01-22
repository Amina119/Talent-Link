import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { toast } from "../../store/toast";

type Talent = {
  id: string;
  name: string;
  headline: string;
  credibility: number;
  skills: string[];
  bio: string;
  location?: string;
  language?: string;
};


const MOCK_TALENTS: Talent[] = [
  {
    id: "t1",
    name: "Amina K.",
    headline: "Frontend Engineer • UI/UX",
    credibility: 84,
    skills: ["React", "TypeScript", "UI/UX", "Figma"],
    bio: "Passionnée par les interfaces premium et les produits utiles.",
    location: "Douala",
    language: "FR",
  },
  {
    id: "t2",
    name: "David S.",
    headline: "Backend • APIs",
    credibility: 76,
    skills: ["FastAPI", "PostgreSQL", "Docker"],
    bio: "Développeur backend motivé, spécialisé dans les APIs et bases de données.",
    location: "Yaoundé",
    language: "EN",
  },
  // Ajouter plus de talents pour MVP si nécessaire
];

export default function TalentDetails() {
  const { talentId } = useParams<{ talentId: string }>();
  const navigate = useNavigate();
  const [talent, setTalent] = useState<Talent | null>(null);

  useEffect(() => {
    if (!talentId) return;
    const t = MOCK_TALENTS.find((t) => t.id === talentId) || null;
    setTalent(t);
  }, [talentId]);

  if (!talent) return <p className="text-white/70">Talent introuvable.</p>;

  const handleInvite = () => {
    toast.success(`Invitation envoyée à ${talent.name} ✅ (MVP)`);
    // Plus tard : redirection vers TeamDetails avec le projet courant
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">{talent.name}</h1>
          <p className="mt-2 text-white/70">{talent.headline}</p>
          <div className="mt-1 text-xs text-white/50">
            {talent.location} {talent.language && `• ${talent.language}`}
          </div>
        </div>
        <Badge>Crédibilité: {talent.credibility}</Badge>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Bio</div>
          <div className="mt-2 text-white/80">{talent.bio}</div>

          <div className="mt-6 text-sm text-white/60">Compétences</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {talent.skills.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Actions</div>
          <div className="mt-4 space-y-2">
            <Button className="w-full" onClick={handleInvite}>
              Inviter
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => toast.info("GitHub: affichage profil (à brancher).")}
            >
              Voir GitHub
            </Button>
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => toast.info("Message: ouvre /app/messages")}
            >
              Message
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
