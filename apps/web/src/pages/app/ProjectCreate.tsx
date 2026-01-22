import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { toast } from "../../store/toast";

export default function ProjectCreate() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState("React, FastAPI, PostgreSQL");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [credibility, setCredibility] = useState(50);

  const canSubmit =
    title.trim().length >= 3 &&
    desc.trim().length >= 10 &&
    skills.trim().length > 0;

  function submit() {
    if (!canSubmit) {
      return toast.error("Titre (min 3), description (min 10) et compétences requises.");
    }

    // Mock pour MVP
    const projectData = {
      title,
      description: desc,
      skills: skills.split(",").map((s) => s.trim()),
      budget,
      location,
      credibility,
    };

    console.log("Projet créé :", projectData);
    toast.success("Projet créé (MVP UI) ✅");

    // Reset champs
    setTitle("");
    setDesc("");
    setSkills("");
    setBudget("");
    setLocation("");
    setCredibility(50);
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl">Créer un projet</h1>
          <p className="mt-2 text-white/70">Définis ton projet pour lancer le matching.</p>
        </div>
        <Badge>MVP</Badge>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Titre"
            placeholder="ex: Plateforme de matching"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Budget (optionnel)"
            placeholder="ex: 300$"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <Input
          label="Lieu"
          placeholder="ex: Paris"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="block">
          <div className="mb-1 text-xs font-medium text-white/70">Description</div>
          <textarea
            className="w-full rounded-2xl bg-white/10 p-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-400/40"
            placeholder="Décris le besoin, le contexte, les objectifs..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>

        <Input
          label="Compétences requises (séparées par virgule)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <label className="block">
          <div className="mb-1 text-xs font-medium text-white/70">Crédibilité minimale requise</div>
          <input
            type="range"
            min={0}
            max={100}
            value={credibility}
            onChange={(e) => setCredibility(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-white/70 mt-1">{credibility} / 100</div>
        </label>

        <div className="flex gap-3 mt-4">
          <Button onClick={submit} disabled={!canSubmit}>Créer</Button>
          <Button
            variant="ghost"
            onClick={() => {
              setTitle(""); setDesc(""); setSkills(""); setBudget(""); setLocation(""); setCredibility(50);
              toast.info("Formulaire réinitialisé.");
            }}
          >
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>
  );
}
