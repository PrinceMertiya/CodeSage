import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import { languageData } from "../../../constants/dashboard";
import SectionHeader from "../SectionHeader";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
];

export default function LanguageChart() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-[0_20px_40px_rgba(0,0,0,.35)]">
      <SectionHeader
        title="Language Distribution"
        subtitle="Across all repositories"
      />

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languageData}
              dataKey="value"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
            >
              {languageData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}