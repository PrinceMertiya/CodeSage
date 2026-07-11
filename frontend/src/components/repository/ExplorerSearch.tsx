import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ExplorerSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="border-b border-white/10 p-3">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search files..."
          className="h-10 w-full rounded-xl border border-white/10 bg-transparent pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500"
        />
      </div>
    </div>
  );
}