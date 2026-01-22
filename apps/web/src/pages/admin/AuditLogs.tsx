type Log = { id: string; action: string; user: string; date: string };

const logs: Log[] = [
  { id: "l1", action: "Connexion", user: "Jean Dupont", date: "2026-01-20 10:12" },
  { id: "l2", action: "Modification profil", user: "Amina K.", date: "2026-01-19 14:05" },
];

export default function AuditLogs() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="font-display text-3xl font-bold text-white mb-4">Logs d'audit</h1>
      <div className="space-y-2">
        {logs.map((l) => (
          <div
            key={l.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-4 flex justify-between text-white/80"
          >
            <div>{l.user}</div>
            <div>{l.action}</div>
            <div className="text-xs text-white/50">{l.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
