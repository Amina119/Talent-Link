import { useMemo, useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { toast } from "../../store/toast";

type Msg = { id: string; from: string; text: string; at: string };

const seed: Msg[] = [
  { id: "m1", from: "Team", text: "Bienvenue sur le chat d’équipe 🎉", at: "09:12" },
  { id: "m2", from: "Amina", text: "On commence par le backlog ?", at: "09:14" },
];

export default function Messages() {
  const [items, setItems] = useState<Msg[]>(seed);
  const [text, setText] = useState("");

  const count = useMemo(() => items.length, [items]);

  function send() {
    const v = text.trim();
    if (v.length < 1) return toast.info("Écris un message.");
    const at = new Date();
    const it: Msg = {
      id: Math.random().toString(36).slice(2),
      from: "Moi",
      text: v,
      at: `${String(at.getHours()).padStart(2, "0")}:${String(at.getMinutes()).padStart(2, "0")}`,
    };
    setItems((x) => [...x, it]);
    setText("");
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Messages</h1>
          <p className="mt-2 text-white/70">Chat d’équipe (MVP). WebSocket bonus plus tard.</p>
        </div>
        <Badge>{count} msgs</Badge>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">Conversations</div>
          <div className="mt-3 space-y-2">
            <button className="w-full rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15">
              <div className="text-sm font-medium">Team • Projet Alpha</div>
              <div className="text-xs text-white/60">Dernier msg: “On commence…”</div>
            </button>
            <button className="w-full rounded-2xl bg-white/5 p-3 text-left hover:bg-white/10">
              <div className="text-sm font-medium">DM • David</div>
              <div className="text-xs text-white/60">À venir</div>
            </button>
          </div>
        </aside>

        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Team • Projet Alpha</div>
              <div className="text-xs text-white/60">MVP local (sans serveur)</div>
            </div>
            <Badge>Online</Badge>
          </div>

          <div className="mt-4 h-[420px] overflow-auto space-y-2 rounded-2xl bg-black/20 p-3 ring-1 ring-white/10">
            {items.map((m) => (
              <div key={m.id} className={`max-w-[85%] rounded-2xl p-3 ${m.from === "Moi" ? "ml-auto bg-white/10" : "bg-white/5"}`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-white/60">{m.from}</div>
                  <div className="text-[11px] text-white/40">{m.at}</div>
                </div>
                <div className="mt-1 text-sm">{m.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Écris un message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={send}>Envoyer</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
