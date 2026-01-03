
import { UI } from "./constants";

export type ValidationResult = { ok: true } | { ok: false; message: string };

export function estNonVide(s: string, minLen = 1): boolean {
  return typeof s === "string" && s.trim().length >= minLen;
}

export function emailValide(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function motDePasseValide(pw: string): boolean {
  if (!pw) return false;
  return pw.length >= UI.limits.passwordMin;
}
export function validerLogin(email: string, password: string): ValidationResult {
  if (!emailValide(email)) return { ok: false, message: "Adresse e-mail invalide." };
  if (!estNonVide(password, UI.limits.passwordMin)) {
    return { ok: false, message: `Le mot de passe doit contenir au moins ${UI.limits.passwordMin} caractères.` };
  }
  return { ok: true };
}


export function validerInscription(fullName: string, email: string, password: string): ValidationResult {
  if (!estNonVide(fullName, 2)) return { ok: false, message: "Le nom complet est obligatoire (min 2 caractères)." };
  if (fullName.trim().length > UI.limits.nameMax) {
    return { ok: false, message: `Le nom complet est trop long (max ${UI.limits.nameMax} caractères).` };
  }
  if (!emailValide(email)) return { ok: false, message: "Adresse e-mail invalide." };
  if (!motDePasseValide(password)) {
    return { ok: false, message: `Le mot de passe doit contenir au moins ${UI.limits.passwordMin} caractères.` };
  }
  return { ok: true };
}

export function validerBio(bio: string): ValidationResult {
  if (bio.length > UI.limits.bioMax) {
    return { ok: false, message: `La bio est trop longue (max ${UI.limits.bioMax} caractères).` };
  }
  return { ok: true };
}
export function nettoyerTexte(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

