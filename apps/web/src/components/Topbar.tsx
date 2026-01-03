import Button from "./ui/Button";
import { logout } from "../lib/auth";
import Badge from "./ui/Badge";
import { getRole } from "../lib/rbac";

export default function Topbar() {
  const role = getRole();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-sm text-white/70">TalentLink • Interface premium</div>
        <Badge>{role}</Badge>
      </div>
      <Button variant="ghost" onClick={() => { logout(); location.href="/"; }}>
        Déconnexion
      </Button>
    </div>
  );
}
