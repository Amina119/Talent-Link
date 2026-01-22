import { useState } from "react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
};

const seed: User[] = [
  { id: "u1", fullName: "Jean Dupont", email: "jean@mail.com", role: "User", status: "Actif" },
  { id: "u2", fullName: "Amina K.", email: "amina@mail.com", role: "Admin", status: "Actif" },
];

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>(seed);

  function toggleStatus(id: string) {
    setUsers((u) =>
      u.map((user) =>
        user.id === id ? { ...user, status: user.status === "Actif" ? "Banni" : "Actif" } : user
      )
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="font-display text-3xl font-bold text-white mb-4">Gestion des utilisateurs</h1>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 flex justify-between items-center"
          >
            <div>
              <div className="text-lg font-semibold text-white">{u.fullName}</div>
              <div className="text-sm text-white/60">{u.email}</div>
              <Badge className="mt-1">{u.role}</Badge>
            </div>
            <Button variant="secondary" onClick={() => toggleStatus(u.id)}>
              {u.status === "Actif" ? "Bannir" : "Réactiver"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
