import { CheckCircle2, Clock3 } from "lucide-react";

import { FaGithub } from "react-icons/fa"

interface RepositoryRowProps {
  name: string;
  language: string;
  files: number;
  status: string;
  updated: string;
}

export default function RepositoryRow({
  name,
  language,
  files,
  status,
  updated,
}: RepositoryRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl px-3 py-3 transition hover:bg-white/[0.04]">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
          <FaGithub size={18} />
        </div>

        <div>
          <h3 className="font-medium">{name}</h3>

          <p className="text-sm text-zinc-500">
            {language} • {files.toLocaleString()} files
          </p>
        </div>
      </div>

      <div className="text-right">
        <div
          className={`flex items-center justify-end gap-2 text-sm ${
            status === "Completed"
              ? "text-emerald-400"
              : "text-amber-400"
          }`}
        >
          {status === "Completed" ? (
            <CheckCircle2 size={16} />
          ) : (
            <Clock3 size={16} />
          )}

          {status}
        </div>

        <p className="mt-1 text-xs text-zinc-500">{updated}</p>
      </div>
    </div>
  );
}