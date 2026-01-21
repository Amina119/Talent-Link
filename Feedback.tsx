import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import { toast } from "../../store/toast";

type FeedbackItem = {
  id: string;
  author: string;
  project: string;
  rating: number; // 1..5
  comment: string;
  createdAt: string;
};

const seed: FeedbackItem[] = [
  {
    id: "f1",
    author: "Amina K.",
    project: "Hackathon FinTech",
    rating: 5,
    comment: "Très pro, communication claire et livraison rapide.",
    createdAt: "2026-01-02",
  },
  {
    id: "f2",
    author: "David S.",
    project: "App Mobile Schoolink",
    rating: 4,
    comment: "Bon travail. Quelques retours UI mais réactif.",
    createdAt: "2025-12-21",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "text-yellow-300" : "text-white/20"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Feedback() {
  const [items, setItems] = useState<FeedbackItem[]>(seed);
  const [author, setAuthor] = useState("");
  const [project, setProject] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const avg = useMemo(() => {
    if (items.length === 0) return 0;
    const s = items.reduce((acc, x) => acc + x.rating, 0);
    return Math.round((s / items.length) * 10) / 10;
  }, [items]);

  const canSubmit =
    author.trim().length >= 2 && project.trim().length >= 2 && comment.trim().length >= 5;

  function add() {
    if (!canSubmit) {
      toast.error("Remplis tous les champs (auteur, projet, commentaire).");
      return;
    }

    const it: FeedbackItem = {
      id: Math.random().toString(36).slice(2),
      author: author.trim(),
      project: project.trim(),
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setItems((x) => [it, ...x]);
    setAuthor("");
    setProject("");
    setRating(5);
    setComment("");

    toast.success("Feedback ajouté ✅");
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Feedback</h1>
          <p className="mt-2 text-white/70">
            Notes & avis après collaboration (impacte la crédibilité).
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-right">
          <div className="text-xs text-white/60">Moyenne</div>
          <div className="mt-1 text-3xl font-semibold">{avg || "—"}</div>
          <div className="mt-2 flex justify-end gap-2">
            <Badge>{items.length} avis</Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Ajouter un feedback</div>

          <div className="mt-4 space-y-3">
            <Input
              label="Auteur"
              placeholder="ex: John D."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <Input
              label="Projet"
              placeholder="ex: Plateforme e-learning"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />

            <label className="block">
              <div className="mb-1 text-xs font-medium text-white/70">Note</div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={`rounded-2xl px-3 py-2 text-sm ring-1 ring-white/10 transition ${
                      rating === n ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {n}★
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <div className="mb-1 text-xs font-medium text-white/70">Commentaire</div>
              <textarea
                className="w-full rounded-2xl bg-white/10 p-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-400/40"
                placeholder="Décris la collaboration..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="mt-1 text-xs text-white/50">
                Astuce: détaille le sérieux, la communication, la qualité du travail.
              </div>
            </label>

            <Button className="w-full" onClick={add} disabled={!canSubmit}>
              Publier
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((f) => (
            <div key={f.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-white/60">{f.project}</div>
                  <div className="mt-1 text-lg font-semibold">{f.author}</div>
                </div>
                <div className="text-right">
                  <Stars n={f.rating} />
                  <div className="mt-1 text-xs text-white/60">{f.createdAt}</div>
                </div>
              </div>

              <div className="mt-3 text-white/80">{f.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
