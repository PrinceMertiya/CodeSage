import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import RepositoryHeader from "../../components/repository/RepositoryHeader";
import RepositoryTabs from "../../components/repository/RepositoryTabs";
import { repository } from "../../constants/repositoryDetails";
import { useState } from "react";
import RepositoryCodeViewer from "../../components/repository/RepositoryCodeViewer";

import {
  useLocation,
  useParams,
} from "react-router-dom";

import RepositoryOverview from "../../components/repository/RepositoryOverview";
import RepositoryFileExplorer from "../../components/repository/RepositoryFileExplorer";

export default function RepositoryDetailsPage() {
  const location = useLocation();

  const currentTab = location.pathname.split("/")[3] || "overview";
  const [selectedFile, setSelectedFile] =
  useState<string>();

  const { id } = useParams<{ id: string }>();

const repositoryId = id ?? "";




  return (
    <DashboardLayout>
      <Breadcrumb
        items={[
          "Repositories",
          repository.name,
        ]}
      />
      <RepositoryHeader repository={repository} />

      <RepositoryTabs />

      <div className="mt-10">
  {currentTab === "overview" && (
    <RepositoryOverview />
  )}

  {currentTab === "files" && (
    <div className="rounded-3xl border border-white/10 p-16 text-center">
      <div className="grid gap-6 lg:grid-cols-12">
  <div className="lg:col-span-3">
    <RepositoryFileExplorer
  repositoryId={repositoryId}
  selectedFile={selectedFile}
  onSelect={(file) =>
    setSelectedFile(file.path)
  }
/>
  </div>

  <div className="lg:col-span-9">
    <RepositoryCodeViewer
    selectedFile={selectedFile}
/>
  </div>
</div>

    </div>
  )}

  {currentTab === "architecture" && (
    <div className="rounded-3xl border border-white/10 p-16 text-center">
      Architecture Viewer Coming Soon
    </div>
  )}

  {currentTab === "assistant" && (
    <div className="rounded-3xl border border-white/10 p-16 text-center">
      AI Assistant Coming Soon
    </div>
  )}

  {currentTab === "insights" && (
    <div className="rounded-3xl border border-white/10 p-16 text-center">
      Insights Coming Soon
    </div>
  )}
</div>
    </DashboardLayout>
  );
}