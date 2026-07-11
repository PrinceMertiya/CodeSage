import {
  Copy,
  Download,
  Maximize2,
  Sparkles,
  Check,
} from "lucide-react";
import { useState } from "react";

interface Props {
  fileName?: string;
  onCopy: () => void;
  onExplain: () => void;
}

export default function CodeToolbar({
  fileName,
  onCopy,
  onExplain,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#111827]/60 px-6 py-4 backdrop-blur-xl">
      {/* Left */}
      <div>
        <h3 className="text-lg font-semibold text-white">
          {fileName ?? "No file selected"}
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          Repository File
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Fullscreen */}
        <button
          className="rounded-xl border border-white/10 p-2.5 transition hover:border-indigo-500 hover:bg-indigo-500/10"
          title="Fullscreen"
        >
          <Maximize2 size={18} />
        </button>

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="rounded-xl border border-white/10 p-2.5 transition hover:border-indigo-500 hover:bg-indigo-500/10"
          title="Copy"
        >
          {copied ? (
            <Check
              size={18}
              className="text-emerald-400"
            />
          ) : (
            <Copy size={18} />
          )}
        </button>

        {/* Download */}
        <button
          className="rounded-xl border border-white/10 p-2.5 transition hover:border-indigo-500 hover:bg-indigo-500/10"
          title="Download"
        >
          <Download size={18} />
        </button>

        {/* Explain with AI */}
        <button
          onClick={onExplain}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,.35)]"
        >
          <Sparkles size={16} />
          Explain with AI
        </button>
      </div>
    </div>
  );
}