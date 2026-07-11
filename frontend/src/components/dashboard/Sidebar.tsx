

import {
  LayoutDashboard,
  FolderGit2,
  Bot,
  Network,
  FileText,
  Settings,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-[#050816] lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-white/10 px-8">
        <div className="text-2xl font-bold">
          <span className="text-white">Code</span>

          <span className="text-indigo-400">Sage</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        <SidebarItem
          to="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
        />

        <SidebarItem
          to="/repositories"
          icon={FolderGit2}
          label="Repositories"
        />

        <SidebarItem
          to="/chat"
          icon={Bot}
          label="AI Chat"
        />

        <SidebarItem
          to="/architecture"
          icon={Network}
          label="Architecture"
        />

        <SidebarItem
          to="/documentation"
          icon={FileText}
          label="Documentation"
        />
      </nav>

      <div className="border-t border-white/10 p-5">
        <SidebarItem
          to="/settings"
          icon={Settings}
          label="Settings"
        />
      </div>
    </aside>
  );
}