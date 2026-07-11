import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10">
      <Bell size={18} />

      <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-indigo-500" />
    </button>
  );
}