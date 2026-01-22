import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/Badge";

export default function AdminHome() {
  // Statistiques fictives
  const stats = [
    { label: "Utilisateurs", value: 123 },
    { label: "Logs d'audit", value: 456 },
    { label: "Matching Config", value: 3 },
    { label: "Modération", value: 7 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="font-display text-3xl font-bold text-white">Admin Dashboard</h1>
      <p className="mt-2 text-white/60">Gestion des utilisateurs, logs, matching et modération.</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={`/${s.label.toLowerCase().replace(/\s/g, "")}`}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition"
          >
            <div className="text-sm text-white/60">{s.label}</div>
            <div className="mt-2 text-3xl font-bold text-white">{s.value}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
