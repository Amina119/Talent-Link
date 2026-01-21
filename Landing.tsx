import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { APP, ROUTES } from "../../lib/constants";

export default function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 text-white">
      <header className="flex items-center justify-between">
        <div className="font-display text-xl">TalentLink</div>
        <div className="flex gap-2">
          <Link to={ROUTES.auth.login}><Button variant="ghost">Connexion</Button></Link>
          <Link to={ROUTES.auth.register}><Button>Commencer</Button></Link>
        </div>
      </header>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl leading-tight">
            {APP.tagline.split(" ").slice(0, 4).join(" ")}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
              smart
            </span>{" "}
            matching.
          </h1>
          <p className="mt-4 text-white/75">
            Crée un projet, définis les compétences requises et laisse TalentLink recommander les meilleurs profils.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to={ROUTES.auth.register}><Button>Créer un compte</Button></Link>
            <Link to={ROUTES.public.features}><Button variant="secondary">Découvrir</Button></Link>
          </div>

          <div className="mt-8 flex gap-3 text-sm text-white/70">
            <span className="rounded-full bg-white/10 px-3 py-1">Matching</span>
            <span className="rounded-full bg-white/10 px-3 py-1">GitHub</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Feedback</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Admin RBAC</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
          <div className="text-sm text-white/70">Aperçu</div>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl bg-white/10 p-4">✅ Recommandations de talents</div>
            <div className="rounded-2xl bg-white/10 p-4">✅ Gestion projets & équipes</div>
            <div className="rounded-2xl bg-white/10 p-4">✅ Audit & outils admin</div>
          </div>
        </div>
      </section>
    </div>
  );
}
