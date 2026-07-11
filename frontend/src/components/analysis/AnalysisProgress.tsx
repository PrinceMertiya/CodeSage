import { analysisStages } from "../../constants/analysis";

import ProgressBar from "./ProgressBar";
import StatusCard from "./StatusCard";
import EstimatedTime from "./EstimatedTime";

export default function AnalysisProgress() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8">
      <h2 className="text-3xl font-bold">
        Analyzing Repository
      </h2>

      <p className="mt-2 text-zinc-400">
        github.com/Prince/CodeSage
      </p>

      <div className="mt-8">
        <ProgressBar value={62} />
      </div>

      <div className="mt-8 grid gap-4">
        {analysisStages.map((stage) => (
          <StatusCard
            key={stage.title}
            {...stage}
          />
        ))}
      </div>

      <div className="mt-8">
        <EstimatedTime />
      </div>
    </div>
  );
}