import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { register } from "../../lib/auth";
import { ROUTES } from "../../lib/constants";
import { AVAILABILITY } from "../../lib/constants";
import { uiStore } from "../../store/uiStore";

export default function Register() {
  const navigate = useNavigate();
  const addToast = uiStore((state) => state.addToast);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState(AVAILABILITY[0]);
  const [loading, setLoading] = useState(false);

  const canSubmit =
    fullName.trim().length >= 2 &&
    email.trim() !== "" &&
    password.length >= 8 &&
    password === confirm &&
    profession.trim().length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      addToast("Vérifie tes champs. Mot de passe min 8 caractères et confirmation correcte.", "error");
      return;
    }

    setLoading(true);
    try {
      await register(email.trim().toLowerCase(), password, fullName.trim(), {
        profession: profession.trim(),
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        availability,
      });
      addToast("Compte créé ✅", "success");
      navigate(ROUTES.app.dashboard);
    } catch (err: any) {
      addToast(err?.message ?? "Erreur d'inscription", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <h1 className="text-3xl font-display font-bold text-white text-center">Créer un compte</h1>
        <p className="mt-2 text-white/70 text-center">Complète ton profil pour améliorer ton matching TalentLink.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input
            label="Nom complet"
            placeholder="Ex: Jean Dupont"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Email"
            placeholder="you@mail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Mot de passe"
            placeholder="Min 8 caractères"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <Input
            label="Profession / Rôle"
            placeholder="Ex: Développeur Frontend"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />

          <Input
            label="Compétences (séparées par virgule)"
            placeholder="Ex: React, TypeScript, UI/UX"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label className="block">
            <span className="text-sm text-white/70">Statut / Disponibilité</span>
            <select
              className="w-full rounded-2xl bg-white/5 border-none p-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none mt-1"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              {AVAILABILITY.map((val) => (
                <option key={val} value={val} className="bg-slate-900">
                  {val}
                </option>
              ))}
            </select>
          </label>

          <Button className="w-full" disabled={loading || !canSubmit}>
            {loading ? "Création..." : "S'inscrire"}
          </Button>
        </form>

        <div className="mt-4 text-sm text-center">
          <span className="text-white/70">Déjà un compte ? </span>
          <a href={ROUTES.auth.login} className="text-blue-400 hover:text-blue-300">
            Se connecter
          </a>
        </div>
      </div>
    </div>
  );
}
