import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { register } from "../../lib/auth";
import { ROUTES } from "../../lib/constants";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanFullName = fullName.trim();

    if (password.length < 8) return setError("Le mot de passe doit faire au moins 8 caractères.");
    if (password !== confirm) return setError("Les mots de passe ne correspondent pas.");

    setLoading(true);
    try {
      await register(cleanEmail, password, cleanFullName || undefined);
      navigate(ROUTES.app.dashboard);
    } catch (err: any) {
      setError(err?.message ?? "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Créer un compte</h1>
          <p className="mt-1 text-sm text-white/70">Rejoins TalentLink en quelques secondes.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="text-xs text-white/70">Nom complet (optionnel)</span>
            <input
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none focus:border-blue-500/40"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Jean Dupont"
            />
          </label>

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
              placeholder="Min 8 caractères"
              required
            />
          </label>

          <label className="block">
            <span className="text-xs text-white/70">Confirmer</span>
            <input
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none focus:border-blue-500/40"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              required
            />
          </label>

          <Button className="w-full" disabled={loading}>
            {loading ? "Création..." : "Sign up"}
          </Button>
        </form>

        <div className="mt-4 text-sm">
          <span className="text-white/70">Déjà un compte ? </span>
          <Link to={ROUTES.auth.login} className="text-blue-400 hover:text-blue-300">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
