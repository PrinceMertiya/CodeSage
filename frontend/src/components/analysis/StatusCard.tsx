import {
  CheckCircle2,
  Circle,
  Loader2,
} from "lucide-react";

interface Props {
  title: string;
  completed?: boolean;
  active?: boolean;
}

export default function StatusCard({
  title,
  completed,
  active,
}: Props) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      {completed ? (
        <CheckCircle2
          className="text-emerald-400"
          size={20}
        />
      ) : active ? (
        <Loader2
          className="animate-spin text-indigo-400"
          size={20}
        />
      ) : (
        <Circle
          className="text-zinc-500"
          size={20}
        />
      )}

      <span
        className={`font-medium ${
          completed
            ? "text-white"
            : active
            ? "text-indigo-400"
            : "text-zinc-500"
        }`}
      >
        {title}
      </span>
    </div>
  );
}