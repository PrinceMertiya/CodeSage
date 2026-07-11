import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

import AnalysisProgress from "../../components/analysis/AnalysisProgress";
import AnalysisLogs from "../../components/analysis/AnalysisLogs";

export default function AnalysisPage() {
  const navigate = useNavigate();

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

          {/* Temporary button for testing */}
          <button
            onClick={() => navigate("/repositories/1")}
            className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white transition hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]"
          >
            Finish Analysis
          </button>
        </div>

        <AnalysisLogs />
      </div>
    </DashboardLayout>
  );
}