import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";

type Log = { id: number; actor_user_id: number|null; action: string; target_type: string; target_id: string; meta_json: string; created_at: string };

export default function AuditLogs() {
  const q = useQuery({ queryKey: ["admin-audit"], queryFn: () => apiFetch<Log[]>("/admin/audit-logs?limit=80") });

  return (
    <div>
      <h1 className="font-display text-3xl">Admin • Audit</h1>
      <p className="mt-2 text-white/70">Tout ce que les utilisateurs font (et ce qui pose problème).</p>

      <div className="mt-6 space-y-2">
        {(q.data ?? []).map(l => (
          <div key={l.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-medium">{l.action}</div>
            <div className="mt-1 text-xs text-white/60">
              actor={l.actor_user_id ?? "—"} • target={l.target_type}:{l.target_id} • {l.created_at}
            </div>
            <div className="mt-2 text-xs text-white/70 break-words">{l.meta_json}</div>
          </div>
        ))}
        {q.isLoading && <div className="text-white/70">Chargement...</div>}
      </div>
    </div>
  );
}
