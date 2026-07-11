import { Sparkles } from "lucide-react";

interface ActivityItemProps {
  title: string;
  time: string;
}

export default function ActivityItem({
  title,
  time,
}: ActivityItemProps) {
  return (
    <div className="relative flex gap-4 pb-6">
      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
        <Sparkles size={16} />
      </div>

      <div className="flex-1">
        <p className="font-medium">{title}</p>

        <p className="mt-1 text-sm text-zinc-500">
          {time}
        </p>
      </div>
    </div>
  );
}