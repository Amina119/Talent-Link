import { useQuery, useMutation } from "@tanstack/react-query";
import Button from "../../components/ui/Button";
import { apiFetch } from "../../lib/api";

type U = { id: number; email: string; full_name: string; role: string; is_active: boolean };

export default function UsersAdmin() {
  const q = useQuery({ queryKey: ["admin-users"], queryFn: () => apiFetch<U[]>("/admin/users") });

  const suspend = useMutation({
    mutationFn: (id: number) => apiFetch(`/admin/users/${id}/suspend`, { method: "POST" }),
    onSuccess: () => q.refetch(),
  });

  const restore = useMutation({
    mutationFn: (id: number) => apiFetch(`/admin/users/${id}/restore`, { method: "POST" }),
    onSuccess: () => q.refetch(),
  });

  return (
    <div>
      <h1 className="font-display text-3xl">Admin • Utilisateurs</h1>
      <p className="mt-2 text-white/70">Suspendre / réactiver des comptes.</p>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
        {q.isLoading ? "Chargement..." : q.isError ? "Erreur" : (
          <div className="space-y-3">
            {q.data!.map(u => (
              <div key={u.id} className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                <div>
                  <div className="font-medium">{u.full_name || u.email}</div>
                  <div className="text-xs text-white/60">{u.email} • role={u.role} • actif={String(u.is_active)}</div>
                </div>
                {u.is_active ? (
                  <Button loading={suspend.isPending} onClick={() => suspend.mutate(u.id)}>Suspendre</Button>
                ) : (
                  <Button variant="secondary" loading={restore.isPending} onClick={() => restore.mutate(u.id)}>Réactiver</Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
