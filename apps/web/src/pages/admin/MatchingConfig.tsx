import { useState } from "react";
import Button from "../../components/ui/Button";

export default function MatchingConfig() {
  const [minScore, setMinScore] = useState(70);
  const [maxTeamSize, setMaxTeamSize] = useState(5);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="font-display text-3xl font-bold text-white mb-4">Configuration du matching</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-white/70 mb-1">Score minimum pour matcher (%)</label>
          <input
            type="number"
            className="rounded-2xl bg-white/5 p-3 text-white w-full ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-white/70 mb-1">Taille maximum des équipes</label>
          <input
            type="number"
            className="rounded-2xl bg-white/5 p-3 text-white w-full ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-500/50 outline-none"
            value={maxTeamSize}
            onChange={(e) => setMaxTeamSize(Number(e.target.value))}
          />
        </div>
        <Button
          onClick={() => alert(`Paramètres sauvegardés: minScore=${minScore}, maxTeamSize=${maxTeamSize}`)}
        >
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}
