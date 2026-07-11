import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import ConnectRepositoryCard from "../../components/repository/ConnectRepositoryCard";

export default function RepositoriesPage() {
  return (
    <DashboardLayout>
      <Breadcrumb
        items={["Repositories", "New Analysis"]}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          New Analysis
        </h1>

        <p className="mt-2 text-zinc-400">
          Connect a repository to start AI-powered code analysis.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <ConnectRepositoryCard />
      </div>
    </DashboardLayout>
  );
}