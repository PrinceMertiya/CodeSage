import StatsCard from "./StatsCard";
import { stats } from "../../constants/dashboard";

export default function StatsGrid() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatsCard
          key={item.title}
          title={item.title}
          value={item.value}
          description={item.description}
          change={item.change}
          icon={item.icon}
        />
      ))}
    </section>
  );
}