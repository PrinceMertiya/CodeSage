import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative hidden w-full max-w-[420px] md:block">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        placeholder="Search repositories..."
        className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500"
      />
    </div>
  );
}