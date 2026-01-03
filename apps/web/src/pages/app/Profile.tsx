import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { apiFetch } from "../../lib/api";
import { uiStore } from "../../store/uiStore";
import { AVAILABILITY, type Availability } from "../../lib/constants";

type Profile = {
  bio: string;
  department: string;
  level: string;
  availability: Availability;
  github_username: string;
  credibility_score: number;
};

export default function ProfilePage() {
  const addToast = uiStore((state) => state.addToast);
  const [form, setForm] = useState<Partial<Profile>>({});
  const q = useQuery({ 
    queryKey: ["profile-me"], 
    queryFn: () => apiFetch<Profile>("/profiles/me") 
  });

  const m = useMutation({
    mutationFn: (payload: Partial<Profile>) =>
      apiFetch<Profile>("/profiles/me", { 
        method: "PUT", 
        body: payload 
      }),
    onSuccess: () => { 
      addToast("Profil mis à jour ✅", "success"); 
      q.refetch(); 
    },
    onError: () => {
      addToast("Erreur lors de la mise à jour", "error");
    }
  });

  const p = q.data;

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-3xl font-bold text-white">Mon profil</h1>
      <p className="mt-2 text-white/60">Complète ton profil pour améliorer le matching intelligent.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Carte Score de Crédibilité */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-medium text-white/50 uppercase tracking-wider">Crédibilité</div>
          <div className="mt-3 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {p?.credibility_score ?? "—"}
          </div>
          <p className="mt-4 text-xs text-white/40 leading-relaxed">
            Calculé via ton activité GitHub et les feedbacks de tes coéquipiers.
          </p>
        </div>

        {/* Formulaire de profil */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          {q.isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Bio personnelle</label>
                <textarea
                  className="w-full min-h-[120px] rounded-2xl bg-white/5 p-4 text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  placeholder="Décris tes compétences et tes passions..."
                  defaultValue={p?.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Département" placeholder="ex: Informatique" defaultValue={p?.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Disponibilité</label>
                  <select 
                    className="w-full rounded-2xl bg-white/5 border-none p-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none"
                    defaultValue={p?.availability}
                    onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value as Availability }))}
                  >
                    {AVAILABILITY.map(val => (
                      <option key={val} value={val} className="bg-slate-900">{val}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Niveau" placeholder="ex: Master 1" defaultValue={p?.level}
                  onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))} />
                <Input label="Nom d'utilisateur GitHub" placeholder="ex: schneider-dev" defaultValue={p?.github_username}
                  onChange={(e) => setForm((f) => ({ ...f, github_username: e.target.value }))} />
              </div>

              <div className="pt-4 border-t border-white/5">
                <Button 
                  className="w-full md:w-auto px-8" 
                  loading={m.isPending} 
                  onClick={() => m.mutate(form)}
                >
                  Sauvegarder les modifications
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}