import { FaGithub } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RepositoryUrlInput({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-zinc-300">
        Repository URL
      </label>

      <div className="relative">
        <FaGithub
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://github.com/user/repository"
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-12 pr-4 outline-none transition focus:border-indigo-500"
        />
      </div>

      <p className="text-xs text-zinc-500">
        Public and private repositories are supported.
      </p>
    </div>
  );
}