import React from "react";

type Variant = "primary" | "ghost" | "secondary";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20",
    secondary: "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10",
    ghost: "bg-white/10 hover:bg-white/15 text-white border border-white/15",
  };

  return (
    <button {...props} className={`${base} ${variants[variant]} ${className}`} />
  );
}

export default Button;
