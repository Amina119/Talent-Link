import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { toast } from "../../store/toast";

type Q = {
  id: string;
  question: string;
  choices: { id: string; label: string; correct: boolean }[];
};

const QUESTIONS: Q[] = [
  {
    id: "q1",
    question: "À quoi sert JWT dans TalentLink ?",
    choices: [
      { id: "a", label: "À stocker des images", correct: false },
      { id: "b", label: "À authentifier l’utilisateur via un token signé", correct: true },
      { id: "c", label: "À remplacer PostgreSQL", correct: false },
    ],
  },
  {
    id: "q2",
    question: "RBAC hybride signifie :",
    choices: [
      { id: "a", label: "Un admin est un user + des permissions supplémentaires", correct: true },
      { id: "b", label: "Tout le monde est admin", correct: false },
      { id: "c", label: "Aucune autorisation n’est nécessaire", correct: false },
    ],
  },
  {
    id: "q3",
    question: "Quel avantage du Modular Monolith ?",
    choices: [
      { id: "a", label: "Déploiement plus simple qu’un microservices", correct: true },
      { id: "b", label: "Nécessite un API Gateway", correct: false },
      { id: "c", label: "Oblige plusieurs bases de données", correct: false },
    ],
  },
];

function scoreToLevel(scorePct: number) {
  if (scorePct >= 85) return { label: "Excellent", badge: "Top Talent" };
  if (scorePct >= 60) return { label: "Bon", badge: "Skilled" };
  return { label: "À améliorer", badge: "Learner" };
}

export default function Assessments() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = QUESTIONS.length;

  const correctCount = useMemo(() => {
    let ok = 0;
    for (const q of QUESTIONS) {
      const a = answers[q.id];
      const choice = q.choices.find((c) => c.id === a);
      if (choice?.correct) ok += 1;
    }
    return ok;
  }, [answers]);

  const scorePct = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  const lvl = scoreToLevel(scorePct);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Assessments</h1>
          <p className="mt-2 text-white/70">
            Mini-évaluation (MVP). Objectif : augmenter la crédibilité via des scores.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-right">
          <div className="text-xs text-white/60">Score</div>
          <div className="mt-1 text-3xl font-semibold">{submitted ? `${scorePct}%` : "—"}</div>
          {submitted && (
            <div className="mt-2 flex justify-end">
              <Badge>{lvl.badge}</Badge>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {QUESTIONS.map((q, idx) => (
          <div key={q.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs text-white/60">Question {idx + 1}</div>
            <div className="mt-1 text-lg font-semibold">{q.question}</div>

            <div className="mt-4 grid gap-2">
              {q.choices.map((c) => {
                const selected = answers[q.id] === c.id;
                const reveal =
                  submitted && selected ? (c.correct ? "ring-green-400/40" : "ring-red-400/40") : "";

                return (
                  <button
                    key={c.id}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: c.id }))}
                    className={[
                      "rounded-2xl bg-white/5 px-4 py-3 text-left text-sm ring-1 ring-white/10 transition",
                      selected ? "bg-white/10" : "hover:bg-white/10",
                      reveal ? `ring-2 ${reveal}` : "",
                      submitted ? "cursor-default opacity-90" : "",
                    ].join(" ")}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="mt-4 text-sm text-white/70">
                Résultat :{" "}
                <span className="font-semibold">
                  {answers[q.id]
                    ? q.choices.find((c) => c.id === answers[q.id])?.correct
                      ? "Correct ✅"
                      : "Faux ❌"
                    : "Non répondu"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {!submitted ? (
          <>
            <Button
              onClick={() => {
                setSubmitted(true);
                toast.success("Évaluation soumise ✅");
              }}
              disabled={Object.keys(answers).length < total}
            >
              Soumettre
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                setAnswers({});
                toast.info("Réponses réinitialisées.");
              }}
            >
              Réinitialiser
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                toast.info("Nouvelle tentative lancée.");
              }}
            >
              Refaire l’évaluation
            </Button>

            <div className="text-sm text-white/70 self-center">
              Niveau : <span className="font-semibold">{lvl.label}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
