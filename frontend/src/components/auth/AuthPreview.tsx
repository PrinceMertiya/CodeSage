import {
  
  BrainCircuit,
  GitBranch,
  FolderGit2,
  Activity,
} from "lucide-react";

import { FaGithub} from "react-icons/fa";

export default function AuthPreview() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

      {/* Main Dashboard */}
      <div className="relative z-10 w-[88%] rounded-3xl border border-white/10 bg-[#0F1117]/90 p-8 shadow-[0_30px_80px_rgba(124,58,237,.25)]">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">
              <FaGithub size={22} />
            </div>

            <div>

              <h3 className="font-semibold text-white">
                github.com/codesage
              </h3>

              <p className="text-sm text-zinc-500">
                AI Repository Analysis
              </p>

            </div>

          </div>

          <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-400">
            Connected
          </span>

        </div>

        {/* Stats */}

        <div className="mt-10 grid grid-cols-2 gap-5">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <FolderGit2 className="text-violet-400" />

            <h4 className="mt-4 text-3xl font-bold">
              245
            </h4>

            <p className="text-zinc-500">
              Source Files
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <BrainCircuit className="text-blue-400" />

            <h4 className="mt-4 text-3xl font-bold">
              92%
            </h4>

            <p className="text-zinc-500">
              AI Health Score
            </p>

          </div>

        </div>

        {/* Repository Tree */}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="mb-4 flex items-center gap-2">

            <GitBranch className="text-violet-400" size={18} />

            <span className="font-medium">
              Repository Structure
            </span>

          </div>

          <div className="space-y-3 text-sm text-zinc-400">

            <p>📂 src</p>

            <p className="ml-6">📂 components</p>

            <p className="ml-12">📄 Navbar.tsx</p>

            <p className="ml-12">📄 Hero.tsx</p>

            <p className="ml-6">📂 pages</p>

            <p className="ml-12">📄 Dashboard.tsx</p>

          </div>

        </div>

        {/* Activity */}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="mb-5 flex items-center gap-2">

            <Activity
              className="text-violet-400"
              size={18}
            />

            <span className="font-medium">
              AI Activity
            </span>

          </div>

          <div className="space-y-4">

            {[
              "Repository scanned",
              "Architecture generated",
              "Dependencies analyzed",
              "AI documentation created",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between"
              >
                <span className="text-zinc-300">
                  {item}
                </span>

                <span className="text-xs text-zinc-500">
                  Just now
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}