import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export default function Button({ variant="primary", loading, className="", disabled, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";
  const styles = {
    primary:
      "text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30",
    secondary:
      "text-slate-900 bg-white/90 border border-white/40 hover:bg-white",
    ghost:
      "text-white/90 hover:bg-white/10",
  }[variant];

  return (
    <button className={`${base} ${styles} ${className}`} disabled={disabled || loading} {...rest}>
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
      {rest.children}
    </button>
  );
}
