import {
  Bug,
  FileText,
  Network,
  ShieldCheck,
} from "lucide-react";

interface Props {
  onSelect: (
    suggestion: string,
  ) => void;
}

const suggestions = [
  {
    icon: Network,
    title:
      "Explain the architecture",
    prompt:
      "Explain the architecture of this repository.",
  },
  {
    icon: Bug,
    title:
      "Find potential issues",
    prompt:
      "Find potential bugs and code quality issues in this repository.",
  },
  {
    icon: ShieldCheck,
    title:
      "Review security",
    prompt:
      "Review this repository for potential security issues.",
  },
  {
    icon: FileText,
    title:
      "Summarize the project",
    prompt:
      "Give me a detailed summary of this project and how it works.",
  },
];

export default function AssistantSuggestions({
  onSelect,
}: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
          <span className="text-3xl">
            ✨
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white">
          Ask about your codebase
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
          CodeSage understands the analyzed
          repository context. Ask about
          architecture, files, functions,
          execution flow, bugs, or improvements.
        </p>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2">
        {suggestions.map(
          ({
            icon: Icon,
            title,
            prompt,
          }) => (
            <button
              key={title}
              type="button"
              onClick={() =>
                onSelect(prompt)
              }
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition hover:border-indigo-500/40 hover:bg-indigo-500/[0.06]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-zinc-400 transition group-hover:text-indigo-400">
                <Icon size={19} />
              </div>

              <span className="text-sm font-medium text-zinc-300 transition group-hover:text-white">
                {title}
              </span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}