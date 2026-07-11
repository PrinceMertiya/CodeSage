import {
  Brain,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react";

import { aiAnalysis } from "../../constants/ai";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AIAssistantPanel({
  open,
  onClose,
}: Props) {
  return (
    <div
      className={`fixed right-0 top-0 z-50 h-screen w-[420px] transform border-l border-white/10 bg-[#0B0B11] transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <Brain className="text-indigo-400" />

          <h2 className="text-xl font-bold">
            AI Assistant
          </h2>
        </div>

        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="space-y-8 p-6">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles
              className="text-indigo-400"
              size={18}
            />

            <h3 className="font-semibold">
              Summary
            </h3>
          </div>

          <p className="text-zinc-400">
            {aiAnalysis.summary}
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">
            Complexity
          </h3>

          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-400">
            {aiAnalysis.complexity}
          </span>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb
              size={18}
              className="text-yellow-400"
            />

            <h3 className="font-semibold">
              Suggestions
            </h3>
          </div>

          <div className="space-y-3">
            {aiAnalysis.suggestions.map((item) => (
              <div
                key={item}
                className="rounded-xl bg-white/[0.03] p-4"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 font-semibold">
          Ask Follow-up
        </button>
      </div>
    </div>
  );
}