import { UI, AVAILABILITY, type Availability } from "./constants";

/* =========================
   TYPES
========================= */

export type ValidationResult =
  | { ok: true }
  | { ok: false; message: string };

/* =========================
   HELPERS GÉNÉRAUX
========================= */

export function estNonVide(value: string, minLen = 1): boolean {
  return typeof value === "string" && value.trim().length >= minLen;
}

export function nettoyerTexte(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/* =========================
   EMAIL
========================= */

export function emailValide(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim().toLowerCase());
}

/* =========================
   MOT DE PASSE
========================= */

export function motDePasseValide(password: string): boolean {
  if (!password) return false;
  return password.length >= UI.limits.passwordMin;
}

/* =========================
   DISPONIBILITÉ (TYPE GUARD)
========================= */

function estDisponibilite(value: string): value is Availability {
  return (AVAILABILITY as readonly string[]).includes(value);
}

/* =========================
   COMPÉTENCES
========================= */

export function nettoyerCompetences(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/* =========================
   VALIDATION LOGIN
========================= */

export function validerLogin(
  email: string,
  password: string
): ValidationResult {
  if (!emailValide(email)) {
    return { ok: false, message: "Adresse e-mail invalide." };
  }

  if (!motDePasseValide(password)) {
    return {
      ok: false,
      message: `Le mot de passe doit contenir au moins ${UI.limits.passwordMin} caractères.`,
    };
  }

  return { ok: true };
}

/* =========================
   VALIDATION INSCRIPTION (COMPLÈTE)
========================= */

export function validerInscriptionComplete(params: {
  fullName: string;
  email: string;
  password: string;
  confirm: string;
  profession: string;
  skills: string[];
  availability: string;
}): ValidationResult {
  const {
    fullName,
    email,
    password,
    confirm,
    profession,
    skills,
    availability,
  } = params;

  /* Nom */
  if (!estNonVide(fullName, 2)) {
    return {
      ok: false,
      message: "Le nom complet est obligatoire (min 2 caractères).",
    };
  }

  if (fullName.length > UI.limits.nameMax) {
    return {
      ok: false,
      message: `Le nom complet est trop long (max ${UI.limits.nameMax} caractères).`,
    };
  }

  /* Email */
  if (!emailValide(email)) {
    return { ok: false, message: "Adresse e-mail invalide." };
  }

  /* Mot de passe */
  if (!motDePasseValide(password)) {
    return {
      ok: false,
      message: `Le mot de passe doit contenir au moins ${UI.limits.passwordMin} caractères.`,
    };
  }

  if (password !== confirm) {
    return {
      ok: false,
      message: "Les mots de passe ne correspondent pas.",
    };
  }

  /* Profession */
  if (!estNonVide(profession, 2)) {
    return {
      ok: false,
      message: "La profession est obligatoire.",
    };
  }

  /* Compétences */
  if (skills.length > UI.limits.skillsMax) {
    return {
      ok: false,
      message: `Trop de compétences (max ${UI.limits.skillsMax}).`,
    };
  }

  /* Disponibilité */
  if (!estDisponibilite(availability)) {
    return {
      ok: false,
      message: "Statut de disponibilité invalide.",
    };
  }

  return { ok: true };
}

/* =========================
   VALIDATION BIO (PROFIL)
========================= */

export function validerBio(bio: string): ValidationResult {
  if (bio.length > UI.limits.bioMax) {
    return {
      ok: false,
      message: `La bio est trop longue (max ${UI.limits.bioMax} caractères).`,
    };
  }

  return { ok: true };
}
