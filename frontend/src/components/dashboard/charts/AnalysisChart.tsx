import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { analysisData } from "../../../constants/dashboard";
import SectionHeader from "../SectionHeader";

export default function AnalysisChart() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-[0_20px_40px_rgba(0,0,0,.35)]">
      <SectionHeader
        title="Analysis Trend"
        subtitle="Repository analyses over the last 7 days"
      />

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={analysisData}>
            <defs>
              <linearGradient id="analysis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#27272a"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="analyses"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#analysis)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}