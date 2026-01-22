
import type { ApiError } from "./api";

export function isApiError(err: unknown): err is ApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    "message" in err &&
    typeof (err as any).status === "number" &&
    typeof (err as any).message === "string"
  );
}

export function messageErreurFR(err: unknown): string {
  if (isApiError(err)) {
    if (err.status === 401) return "Identifiants incorrects. Vérifie ton e-mail et ton mot de passe.";
    if (err.status === 403) return "Accès refusé. Ton compte est peut-être suspendu ou tu n'as pas les permissions.";
    if (err.status === 404) return "Ressource introuvable.";
    if (err.status >= 500) return "Erreur serveur. Réessaie dans quelques instants.";
    return err.message || "Une erreur est survenue.";
  }

  if (err instanceof Error) return err.message;
  return "Une erreur est survenue.";
}
