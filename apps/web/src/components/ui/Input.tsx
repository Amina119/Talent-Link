import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export default function Input({ label, hint, className="", ...rest }: Props) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-xs font-medium text-white/70">{label}</div>}
      <input
        className={`w-full rounded-2xl bg-white/10 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-400/40 ${className}`}
        {...rest}
      />
      {hint && <div className="mt-1 text-xs text-white/50">{hint}</div>}
    </label>
  );
}
