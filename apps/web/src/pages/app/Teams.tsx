import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";

type Team = {
  id: string;
  name: string;
  description: string;
  progress: number; 
  membersCount: number;
  filesCount: number;
  messagesCount: number;
  lastActivity: string;
  tag?: string;
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

function formatPercent(n: number) {
  const v = clamp(Math.round(n));
  return `${v}%`;
}

export default function Teams() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");

  // Mock teams
  const teams = useMemo<Team[]>(
    () => [
      {
        id: "t-1",
        name: "AI Research Project",
        description: "Building ML models for image classification",
        progress: 65,
        membersCount: 5,
        filesCount: 23,
        messagesCount: 156,
        lastActivity: "New file uploaded 2 hours ago",
        tag: "Active",
      },
      {
        id: "t-2",
        name: "E-Commerce Platform",
        description: "Full-stack web application for online shopping",
        progress: 78,
        membersCount: 4,
        filesCount: 31,
        messagesCount: 203,
        lastActivity: "New message 15 minutes ago",
        tag: "Active",
      },
      {
        id: "t-3",
        name: "Mobile App Redesign",
        description: "Revamp onboarding & settings experience",
        progress: 45,
        membersCount: 6,
        filesCount: 18,
        messagesCount: 142,
        lastActivity: "Meeting scheduled for next week",
        tag: "Active",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teams
      .filter((_) => {
        if (filter === "archived") return false; 
        if (filter === "active") return true;
        return true;
      })
      .filter((t) => {
        if (!q) return true;
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
        );
      });
  }, [teams, query, filter]);

  const totals = useMemo(() => {
    const activeTeams = teams.length;
    const totalMessages = teams.reduce((a, t) => a + t.messagesCount, 0);
    const sharedFiles = teams.reduce((a, t) => a + t.filesCount, 0);
    const upcomingMeetings = 2; // mock
    return { activeTeams, totalMessages, sharedFiles, upcomingMeetings };
  }, [teams]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">My Teams</h1>
            <p className="mt-1 text-sm text-white/70">
              Manage your active collaborations and projects.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => alert("Browse Teams (TODO)")}>
              Browse Teams
            </Button>
            <Button onClick={() => alert("Create Team (TODO)")}>
              + Create New Team
            </Button>
          </div>
        </div>

        {/* Top stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Active Teams" value={String(totals.activeTeams)} />
          <StatCard label="Total Messages" value={String(totals.totalMessages)} />
          <StatCard label="Shared Files" value={String(totals.sharedFiles)} />
          <StatCard
            label="Upcoming Meetings"
            value={String(totals.upcomingMeetings)}
          />
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <button
              className={`rounded-full px-4 py-2 text-sm border ${
                filter === "all"
                  ? "bg-white/10 border-white/15"
                  : "bg-transparent border-white/10 text-white/70 hover:text-white hover:border-white/15"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm border ${
                filter === "active"
                  ? "bg-white/10 border-white/15"
                  : "bg-transparent border-white/10 text-white/70 hover:text-white hover:border-white/15"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm border ${
                filter === "archived"
                  ? "bg-white/10 border-white/15"
                  : "bg-transparent border-white/10 text-white/70 hover:text-white hover:border-white/15"
              }`}
              onClick={() => setFilter("archived")}
            >
              Archived
            </button>
          </div>

          <div className="w-full md:w-80">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-white/60">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teams…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Team cards */}
        <div className="mt-6 grid gap-4">
          {filtered.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}

          {filtered.length === 0 && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="text-lg font-semibold">No teams found</div>
              <div className="mt-1 text-sm text-white/70">
                Try a different search or create a new team.
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <Button variant="ghost" onClick={() => setQuery("")}>
                  Clear search
                </Button>
                <Button onClick={() => alert("Create Team (TODO)")}>
                  + Create Team
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xl font-semibold">
                Looking for more collaboration opportunities?
              </div>
              <div className="mt-1 text-sm text-white/70">
                Browse available teams or create your own project.
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => alert("Browse Teams (TODO)")}>
                Browse Teams
              </Button>
              <Button onClick={() => alert("Create Project (TODO)")}>
                Create Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="text-sm text-white/70">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function TeamCard({ team }: { team: Team }) {
  const p = clamp(team.progress);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-sm font-semibold">
              {initials(team.name)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-lg font-semibold">{team.name}</h3>
                {team.tag && (
                  <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-xs text-white/80">
                    {team.tag}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-white/70">{team.description}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Project Progress</span>
              <span className="text-white/80">{formatPercent(p)}</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-500/90"
                style={{ width: `${p}%` }}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <MiniStat label="Members" value={team.membersCount} />
            <MiniStat label="Files" value={team.filesCount} />
            <MiniStat label="Messages" value={team.messagesCount} />
          </div>

          <div className="mt-4 text-sm text-white/70">
            <span className="text-white/50">Recent activity:</span>{" "}
            {team.lastActivity}
          </div>
        </div>

        <div className="flex gap-2 md:flex-col md:items-stretch md:pt-1">
          <Button onClick={() => alert(`Open team: ${team.name} (TODO)`)}>
            View
          </Button>
          <Button
            variant="ghost"
            onClick={() => alert(`Open chat for: ${team.name} (TODO)`)}
          >
            Chat
          </Button>
          <Button
            variant="ghost"
            onClick={() => alert(`Upload to: ${team.name} (TODO)`)}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}
