import { repositories } from "../../constants/dashboard";
import RepositoryRow from "./RepositoryRow";
import SectionHeader from "./SectionHeader";

export default function RecentRepositories() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-[0_20px_40px_rgba(0,0,0,.35)]">
      <SectionHeader
        title="Recent Repositories"
        subtitle="Latest analyzed repositories"
      />

      <div className="space-y-2">
        {repositories.map((repo) => (
          <RepositoryRow key={repo.name} {...repo} />
        ))}
      </div>
    </div>
  );
}