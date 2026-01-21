import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { register } from "../../lib/auth";
import { validerInscription } from "../../lib/validators";
import { messageErreurFR } from "../../lib/errors";

export default function Register() {
  const nav = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div className="mx-auto max-w-md px-6 py-16 text-white">
      <h2 className="font-display text-3xl">Créer un compte</h2>
      <p className="mt-2 text-white/70">Rejoins TalentLink.</p>

      <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
        {err && <div className="rounded-2xl bg-red-500/15 p-3 text-sm text-red-200">{err}</div>}

        <input
          className="w-full rounded-2xl bg-white/10 px-4 py-3 outline-none"
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full rounded-2xl bg-white/10 px-4 py-3 outline-none"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded-2xl bg-white/10 px-4 py-3 outline-none"
          placeholder="Mot de passe (min 8 caractères)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="w-full"
          loading={loading}
          onClick={async () => {
            const v = validerInscription(fullName, email, password);
            if (!v.ok) return setErr(v.message);

            try {
              setLoading(true);
              setErr("");
              await register(email, password, fullName);
              nav("/app/dashboard");
            } catch (e) {
              setErr(messageErreurFR(e));
            } finally {
              setLoading(false);
            }
          }}
        >
          Créer mon compte
        </Button>

        <p className="text-sm text-white/70">
          Déjà un compte ? <Link className="text-cyan-200" to="/auth/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
