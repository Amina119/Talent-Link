import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { toast } from "../../store/toast";

type Match = { id: string; name: string; score: number; reason: string; skills: string[] };

const matches: Match[] = [
  { id: "t1", name: "Amina K.", score: 92, reason: "Skills + crédibilité GitHub élevée", skills: ["React", "UI/UX", "Teamwork"] },
  { id: "t2", name: "David S.", score: 78, reason: "Bonne dispo, skills backend solides", skills: ["FastAPI", "PostgreSQL"] },
  { id: "t3", name: "Junior X.", score: 61, reason: "Skills partiels, crédibilité moyenne", skills: ["React"] },
];

export default function ProjectMatching() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl">Matching</h1>
          <p className="mt-2 text-white/70">Recommandations + explication du score (MVP).</p>
        </div>
        <Badge>Strategy-ready</Badge>
      </div>

      <div className="mt-6 space-y-3">
        {matches.map((m) => (
          <div key={m.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{m.name}</div>
                <div className="mt-1 text-sm text-white/70">{m.reason}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.skills.map((s) => <Badge key={s}>{s}</Badge>)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/60">Score</div>
                <div className="mt-1 text-3xl font-semibold">{m.score}</div>
                <Button className="mt-3" onClick={() => toast.success(`Invitation envoyée à ${m.name} ✅ (MVP)`)}>Inviter</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
