import { providers } from "../../constants/repository";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function GitProviderTabs({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl bg-white/[0.03] p-1">
      {providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => onChange(provider.id)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
            value === provider.id
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20"
              : "text-zinc-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          {provider.label}
        </button>
      ))}
    </div>
  );
}