import { useState } from "react";
import { ShieldCheck } from "lucide-react";

import AnalysisStepper from "./AnalysisStepper";
import GitProviderTabs from "./GitProviderTabs";
import RepositoryUrlInput from "./RepositoryUrlInput";

export default function ConnectRepositoryCard() {
  const [provider, setProvider] = useState("github");
  const [url, setUrl] = useState("");

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-[0_20px_50px_rgba(0,0,0,.35)]">
      <AnalysisStepper currentStep={0} />

      <h2 className="text-2xl font-bold">
        Connect Your Repository
      </h2>

      <p className="mt-2 text-zinc-400">
        Choose a source and securely connect your codebase.
      </p>

      <div className="mt-8">
        <GitProviderTabs
          value={provider}
          onChange={setProvider}
        />
      </div>

      <div className="mt-8">
        <RepositoryUrlInput
          value={url}
          onChange={setUrl}
        />
      </div>

      <button className="mt-8 h-12 w-full rounded-2xl bg-indigo-600 font-semibold transition hover:bg-indigo-500">
        Connect Repository
      </button>

      <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
        <ShieldCheck
          size={18}
          className="text-emerald-400"
        />

        Your code is securely processed and never stored without
        permission.
      </div>
    </div>
  );
}