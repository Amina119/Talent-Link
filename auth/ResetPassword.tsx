import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ResetPassword() {
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-white">
      <h2 className="font-display text-3xl">Réinitialiser le mot de passe</h2>
      <p className="mt-2 text-white/70">MVP: UI seulement (implémentation backend plus tard).</p>
      <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6">
        <Input label="Adresse e-mail" placeholder="ex: you@mail.com" />
        <Button className="w-full">Envoyer</Button>
      </div>
    </div>
  );
}
