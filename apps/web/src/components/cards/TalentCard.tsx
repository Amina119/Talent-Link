import React from "react";
import { AVAILABILITY, type Availability } from "../../lib/constants";

export type Talent = {
  id: string;
  fullName: string;
  profession: string;
  skills: string[];
  availability: Availability;
  githubUsername?: string;
  credibilityScore?: number;
};

type Props = {
  talent: Talent;
  onClick?: () => void;
};

export default function TalentCard({ talent, onClick }: Props) {
  const { fullName, profession, skills, availability, credibilityScore, githubUsername } = talent;

  const availabilityColor = {
    available: "bg-green-500",
    busy: "bg-red-500",
    "part-time": "bg-yellow-400",
  }[availability];

  return (
    <div
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{fullName}</h2>
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${availabilityColor}`}>
          {availability}
        </span>
      </div>
      <p className="mt-1 text-sm text-white/60">{profession}</p>
      {skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      {credibilityScore !== undefined && (
        <div className="mt-4 text-sm text-white/50">
          Crédibilité: <span className="font-semibold text-white">{credibilityScore}</span>
        </div>
      )}
      {githubUsername && (
        <div className="mt-2 text-xs text-blue-400">
          <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer">
            GitHub: {githubUsername}
          </a>
        </div>
      )}
    </div>
  );
}
