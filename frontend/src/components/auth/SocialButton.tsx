import type { ReactNode } from "react";

interface SocialButtonProps {
  icon: ReactNode;
  text: string;
}

export default function SocialButton({
  icon,
  text,
}: SocialButtonProps) {
  return (
    <button
      className="
      flex
      h-14
      w-full
      items-center
      justify-center
      gap-3
      rounded-xl
      border
      border-white/10
      bg-white/[0.03]
      font-medium
      text-zinc-300
      transition-all
      duration-300
      hover:border-violet-500/40
      hover:bg-white/[0.05]
    "
    >
      {icon}
      {text}
    </button>
  );
}