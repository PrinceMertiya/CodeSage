import { activities } from "../../constants/dashboard";
import ActivityItem from "./ActivityItem";
import SectionHeader from "./SectionHeader";

export default function ActivityFeed() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-[0_20px_40px_rgba(0,0,0,.35)]">
      <SectionHeader
        title="Activity Feed"
        subtitle="Recent workspace events"
      />

      <div className="mt-2">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            {...activity}
          />
        ))}
      </div>
    </div>
  );
}