import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import StatsGrid from "../../components/dashboard/StatsGrid";
import AnalysisChart from "../../components/dashboard/charts/AnalysisChart";

import RecentRepositories from "../../components/dashboard/RecentRepositories";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import LanguageChart from "../../components/dashboard/charts/LanguageChart";

import QuickActions from "../../components/dashboard/QuickActions";
import StorageCard from "../../components/dashboard/StorageCard";


export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Breadcrumb
        items={["Dashboard"]}
      />

      <div className="space-y-3">
        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-zinc-400 mt-2 mb-5">
          Analyze repositories, inspect architecture, and chat
          with your AI assistant.
        </p>
      </div>

      {/* <div className="mt-10 grid gap-6 lg:grid-cols-4">
        <div className="h-40 rounded-2xl border border-white/10 bg-white/5" />
        <div className="h-40 rounded-2xl border border-white/10 bg-white/5" />
        <div className="h-40 rounded-2xl border border-white/10 bg-white/5" />
        <div className="h-40 rounded-2xl border border-white/10 bg-white/5" />
      </div> */}

      <StatsGrid />

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
    <div className="xl:col-span-2">
        <AnalysisChart />
    </div>

    <LanguageChart />
</div>

<div className="mt-8 grid gap-6 xl:grid-cols-3">
    <div className="xl:col-span-2">
        <RecentRepositories />
    </div>

    <ActivityFeed />
</div>

<div className="mt-8 grid gap-6 xl:grid-cols-3">
  <div className="xl:col-span-2">
    <QuickActions />
  </div>

  <StorageCard />
</div>
    </DashboardLayout>
  );
}