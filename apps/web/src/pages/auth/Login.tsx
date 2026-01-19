import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { login } from "../../lib/auth";
import { ROUTES } from "../../lib/constants";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
      navigate(ROUTES.app.dashboard);
    } catch (err: any) {
      setError(err?.message ?? "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Connexion</h1>
          <p className="mt-1 text-sm text-white/70">Accède à ton espace TalentLink.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="text-xs text-white/70">Email</span>
            <input
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none focus:border-blue-500/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@mail.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-xs text-white/70">Mot de passe</span>
            <input
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none focus:border-blue-500/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
            />
          </label>

          <Button className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Sign in"}
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

        <div className="mt-6 text-xs text-white/50">
          Retour{" "}
          <Link to={ROUTES.public.landing} className="text-white/70 hover:text-white">
            Landing
          </Link>
        </div>
      </div>
    </div>
  );
}
