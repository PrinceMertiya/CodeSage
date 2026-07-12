import {
  BrainCircuit,
  Sparkles,
} from "lucide-react";

interface Props {
  repositoryName: string;
}

export default function AssistantHeader({
  repositoryName,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
          <BrainCircuit
            size={24}
            className="text-indigo-400"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            CodeSage AI Assistant
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Ask questions about {repositoryName}
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400 sm:flex">
        <Sparkles size={13} />

        Repository Context Active
      </div>
    </div>
  );
}