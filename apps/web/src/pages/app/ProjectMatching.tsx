import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { toast } from "../../store/toast";
import { api } from "../../lib/api";

type Match = {
  talent_id: string;
  name: string;
  score: number;
  explanation: string;
  skills: string[];
  city?: string;
  language?: string;
};

export default function ProjectMatching() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    if (!projectId) return;
    setLoading(true);

    try {
      const data = await api<Match[]>(`/projects/${projectId}/matches`);

      // Tri décroissant par score et limite à 25
      const topMatches = data
        .sort((a, b) => b.score - a.score)
        .slice(0, 25);

      setMatches(topMatches);
    } catch (e: any) {
      setError(e.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [projectId]);

  const handleInvite = async (talentId: string) => {
    try {
      await api(`/teams/${projectId}/invite`, {
        method: "POST",
        body: JSON.stringify({ user_id: talentId }),
      });
      toast.success(`Invitation envoyée à ${talentId} ✅`);
    } catch (err: any) {
      toast.error(`Erreur invitation: ${err.message}`);
    }
  };

  if (loading) return <p className="text-white/70">Chargement du matching…</p>;
  if (error) return <p className="text-red-400">Erreur : {error}</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl">Matching</h1>
          <p className="mt-2 text-white/70">
            Talents recommandés selon les exigences du projet.
          </p>
        </div>
        <Badge>{matches.length} profils</Badge>
      </div>

      {/* Liste des talents */}
      <div className="mt-6 space-y-4">
        {matches.map((m) => (
          <div
            key={m.talent_id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{m.name}</div>
                <div className="mt-1 text-sm text-white/70">{m.explanation}</div>

                <div className="mt-2 flex gap-3 text-xs text-white/50">
                  {m.city && <span>📍 {m.city}</span>}
                  {m.language && <span>🌐 {m.language}</span>}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {m.skills.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-white/60">Score</div>
                <div className="mt-1 text-3xl font-semibold">{m.score}</div>

                <Button
                  className="mt-3"
                  onClick={() => handleInvite(m.talent_id)}
                >
                  Inviter
                </Button>
                <Button
                  className="mt-2 w-full"
                  variant="secondary"
                  onClick={() => navigate(`/app/talents/${m.talent_id}`)}
                >
                  Détails
                </Button>
              </div>
            </div>
          </div>
        ))}

        {matches.length === 0 && (
          <p className="text-white/60">
            Aucun profil compatible trouvé pour ce projet.
          </p>
        )}
      </div>
    </div>
  );
}
