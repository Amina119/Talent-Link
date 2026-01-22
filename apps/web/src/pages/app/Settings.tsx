import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import { logout } from "../../lib/auth";
import { getRole } from "../../lib/rbac";
import { toast } from "../../store/toast";

export default function Settings() {
  const role = getRole();

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Paramètres</h1>
          <p className="mt-2 text-white/70">Gère ton compte, ta session et tes préférences.</p>
        </div>
        <Badge className="uppercase">{role}</Badge>
      </div>

      {/* Sections */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Compte */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Compte</h2>
          <p className="mt-1 text-sm text-white/60">Informations de base (MVP – lecture seule).</p>

          <div className="mt-4 space-y-3">
            <Input label="Adresse e-mail" placeholder="ex: utilisateur@mail.com" disabled />
            <Input label="Nom complet" placeholder="ex: Jean Dupont" disabled />
          </div>

          <div className="mt-4 text-xs text-white/50">
            L’édition des informations du compte sera disponible dans une prochaine version.
          </div>
        </section>

        {/* Sécurité */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Sécurité</h2>
          <p className="mt-1 text-sm text-white/60">Gère ta session et ta sécurité.</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                logout();
                toast.info("Déconnexion réussie.");
                window.location.href = "/";
              }}
            >
              Se déconnecter
            </Button>

            <Button
              variant="ghost"
              onClick={() => toast.info("Réinitialisation du mot de passe : MVP (à venir).")}
            >
              Modifier le mot de passe
            </Button>
          </div>

          <div className="mt-4 text-xs text-white/50">
            Pour l’instant, la sécurité repose sur JWT + HTTPS.
          </div>
        </section>

        {/* Préférences */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Préférences</h2>
          <p className="mt-1 text-sm text-white/60">Personnalisation de l’interface (MVP).</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="ghost"
              onClick={() => toast.info("Mode clair/sombre : déjà géré automatiquement.")}
            >
              Thème (auto)
            </Button>

            <Button variant="ghost" onClick={() => toast.info("Langue : français (par défaut).")}>
              Langue
            </Button>
          </div>

          <div className="mt-4 text-xs text-white/50">
            Ces options sont prévues pour les prochaines itérations.
          </div>
        </section>
      </div>
    </div>
  );
}
