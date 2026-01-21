import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../lib/constants";

export default function Features() {
  const items = [
    ["Matching intelligent", "Score basé sur skills + crédibilité + disponibilité."],
    ["GitHub", "Connexion profil GitHub pour enrichir la crédibilité."],
    ["Feedback", "Avis et notes après collaboration."],
    ["Admin (RBAC)", "L’admin voit tout + options en plus (audit, users, config)."],
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 text-white">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Fonctionnalités</h1>
        <Link to={ROUTES.public.landing}><Button variant="ghost">Accueil</Button></Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">{t}</div>
            <div className="mt-2 text-white/70">{d}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link to={ROUTES.auth.register}><Button>Commencer maintenant</Button></Link>
      </div>
    </div>
  );
}
