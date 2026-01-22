import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import { toast } from "../../store/toast";

type Talent = {
  id: string;
  name: string;
  headline: string;
  credibility: number;
  skills: string[];
  location?: string;
  language?: string;
};

const seed: Talent[] = [
  { id: "t1", name: "Amina K.", headline: "Frontend • UI/UX", credibility: 84, skills: ["React", "TypeScript", "Figma"], location: "Douala", language: "FR" },
  { id: "t2", name: "David S.", headline: "Backend • APIs", credibility: 76, skills: ["FastAPI", "PostgreSQL", "Docker"], location: "Yaoundé", language: "EN" },
  { id: "t3", name: "Junior X.", headline: "Junior Dev", credibility: 61, skills: ["React"], location: "Bafoussam", language: "FR" },
  { id: "t4", name: "Fatou N.", headline: "UI Designer", credibility: 88, skills: ["Figma", "UI/UX"], location: "Paris", language: "FR" },
  { id: "t5", name: "John D.", headline: "Fullstack Dev", credibility: 92, skills: ["React", "Node.js", "MongoDB"], location: "Berlin", language: "EN" },
  { id: "t6", name: "Maria P.", headline: "Data Scientist", credibility: 81, skills: ["Python", "Pandas", "ML"], location: "Madrid", language: "ES" },
  { id: "t7", name: "Kwame L.", headline: "Backend", credibility: 70, skills: ["Django", "PostgreSQL"], location: "Accra", language: "EN" },
  { id: "t8", name: "Lina Q.", headline: "Frontend", credibility: 77, skills: ["Vue", "JavaScript"], location: "Casablanca", language: "FR" },
  { id: "t9", name: "Omar B.", headline: "DevOps", credibility: 85, skills: ["Docker", "Kubernetes", "AWS"], location: "Dubai", language: "EN" },
  { id: "t10", name: "Sophie R.", headline: "UI/UX", credibility: 79, skills: ["Figma", "AdobeXD"], location: "Lyon", language: "FR" },
  { id: "t11", name: "Alex T.", headline: "Frontend", credibility: 68, skills: ["React", "Tailwind"], location: "London", language: "EN" },
  { id: "t12", name: "Hassan M.", headline: "Backend", credibility: 73, skills: ["Node.js", "Express"], location: "Casablanca", language: "FR" },
  { id: "t13", name: "Chloe K.", headline: "Fullstack", credibility: 90, skills: ["React", "Node.js"], location: "Paris", language: "FR" },
  { id: "t14", name: "Nina S.", headline: "Data Analyst", credibility: 82, skills: ["Python", "SQL"], location: "Berlin", language: "EN" },
  { id: "t15", name: "Mohamed A.", headline: "Backend", credibility: 75, skills: ["Java", "Spring"], location: "Casablanca", language: "FR" },
  { id: "t16", name: "Yara L.", headline: "Frontend", credibility: 80, skills: ["React", "TypeScript"], location: "Abidjan", language: "FR" },
  { id: "t17", name: "Leo W.", headline: "DevOps", credibility: 86, skills: ["AWS", "Terraform"], location: "New York", language: "EN" },
  { id: "t18", name: "Emma J.", headline: "UI/UX", credibility: 78, skills: ["Figma", "Sketch"], location: "London", language: "EN" },
  { id: "t19", name: "Kofi N.", headline: "Backend", credibility: 72, skills: ["Python", "Django"], location: "Accra", language: "EN" },
  { id: "t20", name: "Laila H.", headline: "Frontend", credibility: 83, skills: ["Vue", "Tailwind"], location: "Casablanca", language: "FR" },
  { id: "t21", name: "Samir P.", headline: "Fullstack", credibility: 89, skills: ["React", "Node.js"], location: "Dubai", language: "EN" },
  { id: "t22", name: "Fatima Z.", headline: "Data Scientist", credibility: 91, skills: ["Python", "ML"], location: "Rabat", language: "FR" },
  { id: "t23", name: "Paul G.", headline: "Frontend", credibility: 74, skills: ["React", "Tailwind"], location: "Paris", language: "FR" },
  { id: "t24", name: "Nadia F.", headline: "UI Designer", credibility: 87, skills: ["Figma", "UI/UX"], location: "Berlin", language: "EN" },
  { id: "t25", name: "Olivier C.", headline: "Backend", credibility: 79, skills: ["Node.js", "Express"], location: "Lyon", language: "FR" },
];

export default function TalentsSearch() {
  const [q, setQ] = useState("");
  const [minCred, setMinCred] = useState(0);
  const [items] = useState<Talent[]>(seed);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((t) => {
      const okQ =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.headline.toLowerCase().includes(query) ||
        t.skills.some((s) => s.toLowerCase().includes(query)) ||
        (t.location?.toLowerCase().includes(query) ?? false);
      const okC = t.credibility >= minCred;
      return okQ && okC;
    });
  }, [items, q, minCred]);

  const handleInvite = (talentId: string) => {
    toast.success(`Invitation envoyée à ${talentId} ✅ (MVP)`);
    // Plus tard : redirection vers TeamDetails pour le projet correspondant
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Talents</h1>
          <p className="mt-2 text-white/70">
            Recherche de profils + crédibilité + skills (MVP).
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="Rechercher (nom, headline, skill, ville)…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <label className="block">
            <div className="mb-1 text-xs font-medium text-white/70">
              Crédibilité minimale: <span className="font-semibold">{minCred}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={minCred}
              onChange={(e) => setMinCred(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <div className="flex items-end gap-2">
            <Button
              className="w-full"
              onClick={() => toast.info("Filtres avancés : langues, disponibilité, budget (à venir).")}
            >
              Filtres avancés
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-white/60">{t.location || "—"} {t.language && `• ${t.language}`}</div>
                <div className="mt-1 text-xl font-semibold">{t.name}</div>
                <div className="mt-1 text-white/70">{t.headline}</div>
              </div>
              <Badge>Crédibilité {t.credibility}</Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {t.skills.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/app/talents/${t.id}`)}
              >
                Profil
              </Button>
              <Button onClick={() => handleInvite(t.name)}>Inviter</Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
          Aucun talent trouvé.
        </div>
      )}
    </div>
  );
}
