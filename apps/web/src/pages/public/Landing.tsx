import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../lib/constants";

const mockTalents = [
  {
    name: "Sarah Chen",
    role: "Full-Stack Developer",
    city: "San Francisco",
    rating: 4.9,
    match: 95,
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "+1"],
  },
  {
    name: "Marcus Johnson",
    role: "UI/UX Designer",
    city: "New York",
    rating: 4.8,
    match: 92,
    tags: ["Figma", "UI Design", "Prototyping", "Design Systems"],
  },
  {
    name: "Emily Rodriguez",
    role: "Backend Engineer",
    city: "Austin",
    rating: 4.7,
    match: 89,
    tags: ["Python", "Django", "Machine Learning", "Docker"],
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    city: "Seattle",
    rating: 4.9,
    match: 87,
    tags: ["Kubernetes", "CI/CD", "AWS", "Terraform", "+1"],
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      {/* top glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-violet-600/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-8">
        {/* NAV */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-600/20">
              ⚡
            </div>
            <div className="text-lg font-semibold">
              Talent<span className="text-indigo-300">Link</span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#find" className="hover:text-white">Find Talent</a>
            <a href="#how" className="hover:text-white">How It Works</a>
            <a href="#features" className="hover:text-white">Features</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to={ROUTES.auth.login}>
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to={ROUTES.auth.register}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </header>

        {/* HERO */}
        <section className="mt-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
            ✨ AI-Powered Talent Matching
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] md:text-6xl">
            Build Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-300 bg-clip-text text-transparent">
              Dream Team
            </span>{" "}
            <br className="hidden md:block" />
            in Minutes
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-white/70">
            Connect with verified developers, designers, and experts. Our intelligent matching engine finds the
            perfect collaborators for your project based on skills, experience, and compatibility.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={ROUTES.auth.register}>
              <Button className="px-6 py-3 text-base">Start Building Your Team →</Button>
            </Link>
            <Link to={ROUTES.public.features}>
              <Button variant="secondary" className="px-6 py-3 text-base">Browse Talents</Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <Pill>Verified Profiles</Pill>
            <Pill>GitHub Integration</Pill>
            <Pill>Teams & Projects</Pill>
            <Pill>Admin RBAC</Pill>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-16 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-indigo-300">10K+</div>
            <div className="mt-1 text-sm text-white/70">Talents</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-indigo-300">500+</div>
            <div className="mt-1 text-sm text-white/70">Teams Built</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-indigo-300">98%</div>
            <div className="mt-1 text-sm text-white/70">Match Rate</div>
          </div>

          <div className="md:col-span-3 mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">🛡️ Verified Profiles</span>
            <span className="inline-flex items-center gap-2">👥 GitHub Integration</span>
          </div>
        </section>

        {/* TALENTS */}
        <section id="find" className="mt-20">
          <h2 className="text-4xl font-extrabold">
            Discover{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-300 bg-clip-text text-transparent">
              Top Talents
            </span>
          </h2>
          <p className="mt-3 text-white/70">
            Find verified professionals matched to your project requirements. Filter by skills, experience, and availability.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mockTalents.map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold">{t.name}</div>
                    <div className="text-white/70">{t.role}</div>
                    <div className="mt-3 flex items-center gap-3 text-sm text-white/60">
                      <span>📍 {t.city}</span>
                      <span>⭐ {t.rating}</span>
                    </div>
                  </div>

                  <div className="rounded-full bg-indigo-600/20 px-4 py-2 text-sm font-semibold text-indigo-200">
                    {t.match}% Match
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="w-full py-3">+ Add to Team</Button>
                  <button className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10">
                    🐙
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mt-24">
          <h2 className="text-4xl font-extrabold">How TalentLink Works</h2>
          <p className="mt-3 text-white/70">
            From project description to successful collaboration in four simple steps.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              ["1", "Describe Your Project", "Tell us your goals and required skills. Our AI analyzes your needs."],
              ["2", "Get Matched", "We recommend verified talents whose experience aligns with your requirements."],
              ["3", "Build Your Team", "Invite, compare, and assemble the best collaborators."],
              ["4", "Deliver Together", "Coordinate tasks, chat, and track progress in one place."],
            ].map(([n, title, desc]) => (
              <div key={n} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/30 font-bold text-indigo-200">
                  {n}
                </div>
                <div className="text-xl font-semibold">{title}</div>
                <div className="mt-2 text-white/70">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mt-24">
          <h2 className="text-4xl font-extrabold">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-300 bg-clip-text text-transparent">
              Build Teams
            </span>
          </h2>
          <p className="mt-3 text-white/70">
            Powerful features designed to streamline talent discovery and team collaboration.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              ["🧠", "AI-Powered Matching", "Find the best fit based on skills, experience, and project needs."],
              ["🛡️", "Verified Profiles", "Profiles validated via GitHub integration and background checks."],
              ["🐙", "GitHub Integration", "View real code contributions and repositories on talent profiles."],
              ["⭐", "Ratings & Reviews", "Transparent feedback after projects to ensure quality and accountability."],
              ["💬", "Team Communication", "Chat and discussion tools to coordinate in real time."],
              ["📊", "Project Planning", "Organize sprints, assign tasks, and track progress."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <div className="text-2xl">{icon}</div>
                <div className="mt-4 text-xl font-semibold">{title}</div>
                <div className="mt-2 text-white/70">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-700 via-blue-700 to-violet-700 p-10 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs text-white/90">
              ✨ Join 10,000+ professionals
            </div>
            <h3 className="mt-6 text-4xl font-extrabold">Ready to Build Your Perfect Team?</h3>
            <p className="mt-3 text-white/85">
              Stop searching. Start building. Connect with verified talents who match your project needs in minutes.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to={ROUTES.auth.register}>
                <Button variant="secondary" className="px-7 py-3 text-base">Get Started Free →</Button>
              </Link>
              <Button variant="ghost" className="px-7 py-3 text-base">Schedule a Demo</Button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-white/10 py-10 text-white/70">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="text-white font-semibold">TalentLink</div>
              <p className="mt-2 text-sm">
                Build your dream team with AI-powered talent matching. Connect with verified professionals worldwide.
              </p>

              <div className="mt-4 flex gap-2">
                <button className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                  🐙
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                  🐦
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                  in
                </button>
              </div>
            </div>

            <div>
              <div className="text-white font-semibold">Product</div>
              <div className="mt-3 grid gap-2 text-sm">
                <a href="#features" className="hover:text-white">Features</a>
                <a href="#how" className="hover:text-white">How It Works</a>
                <a href="#" className="hover:text-white">Pricing</a>
                <a href="#" className="hover:text-white">FAQ</a>
              </div>
            </div>

            <div>
              <div className="text-white font-semibold">Legal</div>
              <div className="mt-3 grid gap-2 text-sm">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Cookies</a>
              </div>
            </div>
          </div>

          <div className="mt-10 text-xs text-white/50">
            © 2026 TalentLink. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}