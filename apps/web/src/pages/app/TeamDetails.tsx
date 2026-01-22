import { useState } from "react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast } from "../../store/toast";

type Member = {
  id: string;
  name: string;
  role: string;
  email?: string;
};

// Mock members pour MVP
const MOCK_MEMBERS: Member[] = [
  { id: "u1", name: "Moi", role: "Owner", email: "moi@mail.com" },
  { id: "u2", name: "Amina K.", role: "Frontend", email: "amina@mail.com" },
  { id: "u3", name: "David S.", role: "Backend", email: "david@mail.com" },
];

export default function TeamDetails() {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [email, setEmail] = useState("");

  function invite() {
    const e = email.trim();
    if (!e.includes("@")) return toast.error("E-mail invalide.");
    const newMember: Member = {
      id: `u${members.length + 1}`,
      name: e.split("@")[0],
      role: "Invité",
      email: e,
    };
    setMembers([...members, newMember]);
    toast.success(`Invitation envoyée à ${e} ✅ (MVP)`);
    setEmail("");
  }

  function removeMember(id: string) {
    setMembers(members.filter((m) => m.id !== id));
    toast.info("Membre supprimé ✅ (MVP)");
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Équipe • Projet Alpha</h1>
          <p className="mt-2 text-white/70">Membres, invitations, rôles (MVP).</p>
        </div>
        <Badge>{members.length} membres</Badge>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Membres */}
        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Membres</div>
          <div className="mt-4 space-y-2">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-white/60">{m.role}</div>
                  {m.email && <div className="text-xs text-white/50">{m.email}</div>}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => toast.info("Gestion rôles: à venir.")}>
                    Gérer
                  </Button>
                  <Button variant="ghost" onClick={() => removeMember(m.id)}>
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inviter */}
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Inviter</div>
          <div className="mt-4 space-y-3">
            <Input
              label="Email"
              placeholder="ex: membre@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full" onClick={invite}>
              Envoyer invitation
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => toast.info("Lien d’invitation: bonus")}
            >
              Générer lien
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
