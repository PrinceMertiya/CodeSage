import { ChevronDown } from "lucide-react";

export default function UserDropdown() {
  return (
    <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">
      <img
        src="https://i.pravatar.cc/100"
        className="h-10 w-10 rounded-full"
      />

      <div className="hidden text-left md:block">
        <p className="font-semibold">Prince</p>

        <p className="text-xs text-zinc-400">
          Software Engineer
        </p>
      </div>

      <ChevronDown size={18} />
    </button>
  );
}