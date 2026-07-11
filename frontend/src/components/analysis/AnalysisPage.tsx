import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

import AnalysisProgress from "../../components/analysis/AnalysisProgress";
import AnalysisLogs from "../../components/analysis/AnalysisLogs";

export default function AnalysisPage() {
  return (
    <DashboardLayout>
      <Breadcrumb
        items={[
          "Repositories",
          "Analysis",
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Repository Analysis
        </h1>

        <p className="mt-2 text-zinc-400">
          AI is analyzing your repository.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AnalysisProgress />
        </div>

        <AnalysisLogs />
      </div>
    </DashboardLayout>
  );
}