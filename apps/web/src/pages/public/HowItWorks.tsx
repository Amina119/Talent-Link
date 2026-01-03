import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../lib/constants";

export default function HowItWorks() {
  const steps = [
    ["Créer un profil", "Compétences, disponibilité, GitHub."],
    ["Publier un projet", "Définir compétences requises + objectifs."],
    ["Voir les matches", "Recommandations expliquées (score détaillé)."],
    ["Former une équipe", "Invitations, chat, fichiers, feedback."],
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 text-white">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Comment ça marche</h1>
        <Link to={ROUTES.public.landing}><Button variant="ghost">Accueil</Button></Link>
      </div>

      <div className="mt-8 space-y-3">
        {steps.map(([t, d], idx) => (
          <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs text-white/60">Étape {idx + 1}</div>
            <div className="mt-1 text-lg font-semibold">{t}</div>
            <div className="mt-2 text-white/70">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
