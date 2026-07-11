interface SummaryItem {
  title: string;
  value: string;
}

interface Props {
  summary: SummaryItem[];
}

export default function CodebaseSummary({ summary }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Codebase Summary
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {summary.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white/[0.03] p-5"
          >
            <p className="text-sm text-zinc-400">
              {item.title}
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}