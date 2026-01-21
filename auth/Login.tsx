import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { login } from "../../lib/auth";
import { validerLogin } from "../../lib/validators";
import { messageErreurFR } from "../../lib/errors";
import { useUIStore } from "../../store/uiStore";
import { ROUTES } from "../../lib/constants";

export default function Login() {
  const nav = useNavigate();
  const addToast = useUIStore((state) => state.addToast);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    const validation = validerLogin(email, password);
    if (!validation.ok) {
      setErr(validation.message);
      return;
    }

    try {
      setLoading(true);
      setErr("");
      
      await login(email, password);
      
      addToast("Connexion réussie ✅", "success");
      nav(ROUTES.app.dashboard);
      
    } catch (error) {
  
      const msg = messageErreurFR(error);
      setErr(msg);
      addToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16 text-white">
      <div className="text-center mb-8">
        <h2 className="font-display text-4xl font-bold">Bon retour</h2>
        <p className="mt-2 text-white/60">Ravi de vous revoir sur TalentLink.</p>
      </div>

      <form 
        onSubmit={handleLogin}
        className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
      >
        {err && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 animate-in fade-in zoom-in-95">
            {err}
          </div>
        )}

        <Input 
          label="Adresse e-mail" 
          placeholder="nom@exemple.com" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
        />

        <Input 
          label="Mot de passe" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />

        <div className="pt-2">
          <Button 
            className="w-full" 
            loading={loading} 
            type="submit"
          >
            Se connecter
          </Button>
        </div>

        <p className="text-center text-sm text-white/50">
          Pas encore de compte ?{" "}
          <Link 
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors" 
            to={ROUTES.auth.register}
          >
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );
}