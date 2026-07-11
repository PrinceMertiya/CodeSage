import { Clock3 } from "lucide-react";

export default function EstimatedTime() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <Clock3
        size={20}
        className="text-indigo-400"
      />

      <div>
        <p className="text-sm text-zinc-400">
          Estimated Time Remaining
        </p>

        <h3 className="text-xl font-bold">
          00:48
        </h3>
      </div>
    </div>
  );
}