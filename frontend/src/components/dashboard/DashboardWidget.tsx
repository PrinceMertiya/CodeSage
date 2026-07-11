import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  icon: LucideIcon;
}

export default function DashboardWidget({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
}: Props) {
  return (
    <div className="group h-[120px] rounded-2xl border border-[#23252d] bg-[#13151d] p-5 transition-all duration-300 hover:border-violet-500/40 hover:bg-[#171923]">
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-zinc-500">{title}</p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
          <Icon
            size={22}
            className="text-violet-400"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <p className="text-xs text-zinc-500">
          {subtitle}
        </p>

        <span className="text-xs font-semibold text-green-400">
          {trend}
        </span>
      </div>
    </div>
  );
}