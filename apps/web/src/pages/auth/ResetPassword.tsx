import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/constants";

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="mt-2 text-sm text-white/70">
          MVP : on branchera l’envoi email plus tard. Pour l’instant, contacte l’admin ou recrée un compte.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            to={ROUTES.auth.login}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            Retour login
          </Link>
          <Link
            to={ROUTES.auth.register}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
