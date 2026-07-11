import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Props {
  to: string;
  icon: LucideIcon;
  label: string;
}

export default function SidebarItem({
  to,
  icon: Icon,
  label,
}: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-4 py-3 transition-all
        ${
          isActive
            ? "bg-indigo-500/15 text-indigo-400"
            : "text-zinc-400 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      <Icon size={20} />

      <span className="font-medium">{label}</span>
    </NavLink>
  );
}