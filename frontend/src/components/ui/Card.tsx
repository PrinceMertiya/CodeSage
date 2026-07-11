import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-[#111113] shadow-lg transition-all duration-300 hover:border-violet-500/40 ${className}`}
    >
      {children}
    </div>
  );
}