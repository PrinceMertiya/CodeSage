import {
  ArrowRight,
  Bot,
  FolderPlus,
  Network,
} from "lucide-react";

import SectionHeader from "./SectionHeader";

const actions = [
  {
    title: "New Analysis",
    icon: ArrowRight,
  },
  {
    title: "Connect Repository",
    icon: FolderPlus,
  },
  {
    title: "AI Chat",
    icon: Bot,
  },
  {
    title: "Architecture",
    icon: Network,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-[0_20px_40px_rgba(0,0,0,.35)]">
      <SectionHeader
        title="Quick Actions"
        subtitle="Frequently used actions"
      />

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10"
            >
              <Icon
                size={22}
                className="mb-4 text-indigo-400"
              />

              <h3 className="font-medium">
                {action.title}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}