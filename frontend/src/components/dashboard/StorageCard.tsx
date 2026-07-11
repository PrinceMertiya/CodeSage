import SectionHeader from "./SectionHeader";
import CircularProgress from "./CircularProgress";

export default function StorageCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-[0_20px_40px_rgba(0,0,0,.35)]">
      <SectionHeader
        title="Storage Usage"
        subtitle="Workspace storage"
      />

      <div className="flex flex-col items-center">
        <CircularProgress value={24} />

        <h3 className="mt-6 text-3xl font-bold">
          2.45 GB
        </h3>

        <p className="mt-1 text-zinc-500">
          of 10 GB used
        </p>
      </div>
    </div>
  );
}