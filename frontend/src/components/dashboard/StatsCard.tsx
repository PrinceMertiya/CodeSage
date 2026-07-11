import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  change: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  description,
  change,
  icon: Icon,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
className="
group
rounded-3xl
border
border-white/10
bg-gradient-to-b
from-white/[0.05]
to-white/[0.02]
p-6
shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,.35)]
transition-all
duration-300
hover:-translate-y-1
hover:border-indigo-500/40
hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]
"    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {value}
          </h2>

          <div className="mt-3 flex items-center gap-2">
    <TrendingUp size={15} className="text-emerald-400" />
    <span className="text-sm font-medium text-emerald-400">
        {change}
    </span>
</div>

<p className="mt-2 text-sm text-zinc-500">
    {description}
</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
    <Icon size={18} />
</div>
      </div>

      {/* <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-emerald-400">
          <TrendingUp size={16} />
          {change}
        </div>

        <div className="flex items-end gap-[3px]">
          {[18, 28, 22, 40, 34, 48, 56].map((height, index) => (
            <div
              key={index}
              style={{ height }}
              className="w-[4px] rounded-full bg-gradient-to-t from-indigo-600 to-violet-400"
            />
          ))}
        </div>
      </div> */}

      <div className="mt-6 flex justify-end">
    <div className="flex items-end gap-[3px]">
        {[18, 28, 22, 40, 34, 48, 56].map((height, index) => (
            <div
                key={index}
                style={{ height }}
                className="w-[4px] rounded-full bg-gradient-to-t from-indigo-600 to-violet-400"
            />
        ))}
    </div>
</div>
    </motion.div>
  );
}