import { Bell, Search, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-[#0B0B11] px-8">
      {/* Search */}
      <div className="relative w-[420px]">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type="text"
          placeholder="Search repositories..."
          className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button type="button" className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold transition hover:bg-violet-500">
          <Plus size={16} />
          New Analysis
        </button>

        <button type="button" aria-label="Notifications" title="Notifications" className="rounded-xl border border-zinc-800 p-2 hover:bg-zinc-900">
          <Bell size={20} />
        </button>

        <button type="button" aria-label="Profile" title="Profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold">
          P
        </button>
      </div>
    </header>
  );
}