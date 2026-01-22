import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { apiFetch } from "../../lib/api";
import { uiStore } from "../../store/uiStore";
import { AVAILABILITY, type Availability } from "../../lib/constants";

type Profile = {
  fullName: string;
  email: string;
  bio: string;
  profession: string;
  skills: string[];
  availability: Availability;
  credibility_score: number;
};

export default function ProfilePage() {
  const addToast = uiStore((state) => state.addToast);

  const [form, setForm] = useState<Partial<Profile>>({});

  const q = useQuery({
    queryKey: ["profile-me"],
    queryFn: () => apiFetch<Profile>("/profiles/me"),
  });

  const m = useMutation({
    mutationFn: (payload: Partial<Profile>) =>
      apiFetch<Profile>("/profiles/me", {
        method: "PUT",
        body: payload,
      }),
    onSuccess: () => {
      addToast("Profil mis à jour ✅", "success");
      q.refetch();
    },
    onError: () => {
      addToast("Erreur lors de la mise à jour", "error");
    },
  });

  const p = q.data;

  // Préremplir le formulaire après chargement
  useEffect(() => {
    if (p) {
      setForm({
        fullName: p.fullName,
        email: p.email,
        bio: p.bio,
        profession: p.profession,
        skills: p.skills.join(", "),
        availability: p.availability,
      });
    }
  }, [p]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="font-display text-3xl font-bold text-white">Mon profil</h1>
      <p className="mt-2 text-white/60">
        Complète ou modifie ton profil pour améliorer le matching intelligent.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Carte Score de Crédibilité */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-medium text-white/50 uppercase tracking-wider">
            Crédibilité
          </div>
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
              <Input
                label="Nom complet"
                value={form.fullName || ""}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              />

              <Input
                label="Email"
                value={form.email || ""}
                disabled
              />

              <Input
                label="Profession / Rôle"
                placeholder="Ex: Développeur Frontend"
                value={form.profession || ""}
                onChange={(e) => setForm((f) => ({ ...f, profession: e.target.value }))}
              />

              <Input
                label="Compétences (séparées par virgule)"
                placeholder="Ex: React, TypeScript, UI/UX"
                value={form.skills || ""}
                onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
              />

              <label className="block">
                <span className="text-sm text-white/70">Statut / Disponibilité</span>
                <select
                  className="w-full rounded-2xl bg-white/5 border-none p-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none mt-1"
                  value={form.availability}
                  onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value as Availability }))}
                >
                  {AVAILABILITY.map((val) => (
                    <option key={val} value={val} className="bg-slate-900">
                      {val}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-white/70">Bio personnelle</span>
                <textarea
                  className="w-full min-h-[120px] rounded-2xl bg-white/5 p-4 text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all mt-1"
                  placeholder="Décris tes compétences et tes passions..."
                  value={form.bio || ""}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                />
              </label>

              <div className="pt-4 border-t border-white/5">
                <Button
                  className="w-full md:w-auto px-8"
                  loading={m.isPending}
                  onClick={() => {
                    m.mutate({
                      ...form,
                      skills: form.skills?.split(",").map((s) => s.trim()).filter(Boolean),
                    });
                  }}
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
