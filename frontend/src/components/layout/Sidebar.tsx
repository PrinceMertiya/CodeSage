import {
  LayoutDashboard,
  FolderGit2,
  Bot,
  Boxes,
  Sparkles,
  Settings,
  PlusCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Repositories",
    icon: FolderGit2,
    path: "/repositories",
  },
  {
    name: "New Analysis",
    icon: PlusCircle,
    path: "/analysis/new",
  },
  {
    name: "AI Assistant",
    icon: Bot,
    path: "/chat",
  },
  {
    name: "Architecture",
    icon: Boxes,
    path: "/architecture",
  },
  {
    name: "Insights",
    icon: Sparkles,
    path: "/insights",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-[#0B0B11]">
      {/* Logo */}
      <div className="border-b border-zinc-800 px-6 py-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Code<span className="text-violet-500">Sage</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* User Card */}
      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-bold">
            P
          </div>

          <div>
            <p className="font-semibold text-white">Prince M.</p>
            <p className="text-xs text-zinc-500">
              prince@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}