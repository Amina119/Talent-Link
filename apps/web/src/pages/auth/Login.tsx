import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { login } from "../../lib/auth";
import { ROUTES } from "../../lib/constants";
import { uiStore } from "../../store/uiStore";

export default function Login() {
  const navigate = useNavigate();
  const addToast = uiStore((state) => state.addToast);
  const setProfile = uiStore((state) => state.setProfile);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim() !== "" && password.trim() !== "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      // login retourne le profil complet : nom, email, profession, compétences, statut, crédibilité
      const userProfile = await login(email.trim().toLowerCase(), password);

      // stocke dans le uiStore pour utilisation dans l'app
      setProfile(userProfile);

      addToast("Connexion réussie ✅", "success");
      navigate(ROUTES.app.dashboard);
    } catch (err: any) {
      addToast(err?.message ?? "Erreur de connexion", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <h1 className="text-3xl font-display font-bold text-white text-center">Connexion</h1>
        <p className="mt-2 text-white/70 text-center">Accède à ton espace TalentLink.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input
            label="Email"
            placeholder="you@mail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Mot de passe"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" disabled={loading || !canSubmit}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to={ROUTES.auth.reset} className="text-white/70 hover:text-white">
            Mot de passe oublié ?
          </Link>
          <Link to={ROUTES.auth.register} className="text-blue-400 hover:text-blue-300">
            Créer un compte
          </Link>
        </div>

        <div className="mt-6 text-xs text-white/50 text-center">
          Retour{" "}
          <Link to={ROUTES.public.landing} className="text-white/70 hover:text-white">
            Landing
          </Link>
        </div>
      </div>
    </div>
  );
}
