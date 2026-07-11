import { analysisLogs } from "../../constants/analysis";

export default function AnalysisLogs() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6">
      <h2 className="mb-5 text-lg font-semibold">
        Live Analysis Logs
      </h2>

      <div className="space-y-3 font-mono text-sm">
        {analysisLogs.map((log) => (
          <div
            key={log}
            className="rounded-xl bg-black/20 px-4 py-3 text-zinc-300"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}