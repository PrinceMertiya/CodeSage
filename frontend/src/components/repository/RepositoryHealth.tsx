interface Item {
  title: string;
  value: string;
  color: string;
}

interface Props {
  health: Item[];
}

export default function RepositoryHealth({
  health,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Repository Health
      </h2>

      <div className="space-y-4">
        {health.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl bg-white/[0.03] p-4"
          >
            <span>{item.title}</span>

            <span
              className={`font-semibold ${
                item.color === "emerald"
                  ? "text-emerald-400"
                  : item.color === "blue"
                  ? "text-sky-400"
                  : "text-violet-400"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}