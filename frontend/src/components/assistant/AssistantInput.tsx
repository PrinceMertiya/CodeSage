import {
  Send,
  Sparkles,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (
    value: string,
  ) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function AssistantInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
}: Props) {
  const handleSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (
      !value.trim() ||
      isLoading
    ) {
      return;
    }

    onSubmit();
  };

  return (
    <div className="border-t border-white/10 p-5">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl"
      >
        <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/5">
          <Sparkles
            size={19}
            className="mb-3 ml-2 shrink-0 text-indigo-400"
          />

          <textarea
            value={value}
            onChange={(event) =>
              onChange(
                event.target.value,
              )
            }
            onKeyDown={(event) => {
              if (
                event.key ===
                  "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();

                if (
                  value.trim() &&
                  !isLoading
                ) {
                  onSubmit();
                }
              }
            }}
            rows={1}
            placeholder="Ask anything about this repository..."
            className="max-h-40 min-h-[48px] flex-1 resize-none bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-zinc-600"
          />

          <button
            type="submit"
            disabled={
              !value.trim() ||
              isLoading
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white transition hover:shadow-[0_0_25px_rgba(99,102,241,.35)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-zinc-600">
          CodeSage can make mistakes.
          Verify important code changes.
        </p>
      </form>
    </div>
  );
}