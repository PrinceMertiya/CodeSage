import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface Props {
  activities: string[];
}

export default function RecentActivity({
  activities,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6">
      <div className="mb-6 flex items-center gap-3">
        <Sparkles className="text-indigo-400" />

        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity}
            className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-4"
          >
            <CheckCircle2
              className="text-emerald-400"
              size={18}
            />

            <span>{activity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}