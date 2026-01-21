import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { toast } from "../../store/toast";

export default function TalentDetails() {
  const t = {
    name: "Amina K.",
    headline: "Frontend Engineer • UI/UX",
    credibility: 84,
    skills: ["React", "TypeScript", "UI/UX", "Figma"],
    bio: "Passionnée par les interfaces premium et les produits utiles.",
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">{t.name}</h1>
          <p className="mt-2 text-white/70">{t.headline}</p>
        </div>
        <Badge>Crédibilité: {t.credibility}</Badge>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Bio</div>
          <div className="mt-2 text-white/80">{t.bio}</div>

          <div className="mt-6 text-sm text-white/60">Compétences</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.skills.map((s) => <Badge key={s}>{s}</Badge>)}
          </div>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Actions</div>
          <div className="mt-4 space-y-2">
            <Button className="w-full" onClick={() => toast.success("Invitation envoyée ✅ (MVP)")}>Inviter</Button>
            <Button className="w-full" variant="secondary" onClick={() => toast.info("GitHub: affichage profil (à brancher).")}>Voir GitHub</Button>
            <Button className="w-full" variant="ghost" onClick={() => toast.info("Message: ouvre /app/messages")}>Message</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
