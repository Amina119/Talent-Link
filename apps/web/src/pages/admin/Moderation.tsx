import { useState } from "react";
import Button from "../../components/ui/Button";

type Report = { id: string; content: string; user: string; date: string };

const seed: Report[] = [
  { id: "r1", content: "Message inapproprié", user: "Jean Dupont", date: "2026-01-20" },
  { id: "r2", content: "Profil incomplet", user: "Amina K.", date: "2026-01-19" },
];

export default function Moderation() {
  const [reports, setReports] = useState<Report[]>(seed);

  function dismiss(id: string) {
    setReports((r) => r.filter((rep) => rep.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="font-display text-3xl font-bold text-white mb-4">Modération</h1>

      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 flex justify-between items-center">
            <div>
              <div className="text-white">{r.content}</div>
              <div className="text-xs text-white/50">{r.user} - {r.date}</div>
            </div>
            <Button variant="secondary" onClick={() => dismiss(r.id)}>Résolu</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
