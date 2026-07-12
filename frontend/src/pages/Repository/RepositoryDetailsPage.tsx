import {
  useEffect,
  useState,
} from "react";

import {
  LoaderCircle,
} from "lucide-react";

import {
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import RepositoryInsights from "../../components/insights/RepositoryInsights";
import RepositoryAssistant from "../../components/assistant/RepositoryAssistant";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

import RepositoryHeader from "../../components/repository/RepositoryHeader";
import RepositoryTabs from "../../components/repository/RepositoryTabs";
import RepositoryOverview from "../../components/repository/RepositoryOverview";
import RepositoryFileExplorer from "../../components/repository/RepositoryFileExplorer";
import RepositoryCodeViewer from "../../components/repository/RepositoryCodeViewer";

import ArchitectureViewer from "../../components/architecture/ArchitectureViewer";

import {
  RepositoryService,
} from "../../services/repository.service";

import type {
  RepositoryDetails,
} from "../../services/repository.service";


export default function RepositoryDetailsPage() {
  const location =
    useLocation();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const {
    id,
  } = useParams<{
    id: string;
  }>();

  const repositoryId =
    id ?? "";

  const currentTab =
    location.pathname
      .split("/")[3] ||
    "overview";

  /*
  |--------------------------------------------------------------------------
  | Selected File
  |--------------------------------------------------------------------------
  |
  | The URL is the source of truth:
  |
  | /repositories/:id/files?path=src/App.jsx
  |
  */

  const selectedFile =
    searchParams.get("path") ??
    undefined;

  const [
    repository,
    setRepository,
  ] = useState<
    RepositoryDetails | null
  >(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  /*
  |--------------------------------------------------------------------------
  | Load Repository Details
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!repositoryId) {
      return;
    }

    let cancelled = false;

    const fetchRepository =
      async () => {
        try {
          const response =
            await RepositoryService
              .getRepository(
                repositoryId,
              );

          if (cancelled) {
            return;
          }

          setRepository(
            response.data.repository,
          );

          setError(null);
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "Failed to load repository:",
            error,
          );

          setError(
            "Unable to load repository.",
          );
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      };

    void fetchRepository();

    return () => {
      cancelled = true;
    };
  }, [
    repositoryId,
  ]);

  /*
  |--------------------------------------------------------------------------
  | File Selection
  |--------------------------------------------------------------------------
  */

  const handleFileSelect = (
    filePath: string,
  ) => {
    setSearchParams({
      path: filePath,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[600px] items-center justify-center">
          <div className="text-center">
            <LoaderCircle
              size={40}
              className="mx-auto animate-spin text-indigo-400"
            />

            <p className="mt-4 text-zinc-400">
              Loading repository...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (
    error ||
    !repository
  ) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[600px] items-center justify-center">
          <p className="text-zinc-400">
            {error ??
              "Repository not found."}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Repository Owner
  |--------------------------------------------------------------------------
  */

  const getRepositoryOwner = (
    repositoryUrl: string,
  ) => {
    try {
      const url =
        new URL(
          repositoryUrl,
        );

      return (
        url.pathname
          .split("/")
          .filter(Boolean)[0] ??
        "Unknown"
      );
    } catch {
      return "Unknown";
    }
  };

  const owner =
    getRepositoryOwner(
      repository.repositoryUrl,
    );

  /*
  |--------------------------------------------------------------------------
  | Header View Model
  |--------------------------------------------------------------------------
  */

  const headerRepository = {
    name:
      repository.projectName,

    owner,

    visibility:
      "Repository",

    language:
      repository.projectType ??
      "Unknown",

    branch:
      "main",

    stars:
      0,

    lastScan:
      new Date(
        repository.updatedAt,
      ).toLocaleString(),
  };

  return (
    <DashboardLayout>
      <Breadcrumb
        items={[
          "Repositories",
          repository.projectName,
        ]}
      />

      <RepositoryHeader

  repositoryId={
    repositoryId
  }

  repository={
    headerRepository
  }


      />

      <RepositoryTabs />

      <div className="mt-10">
        {currentTab ===
          "overview" && (
          <RepositoryOverview
            repository={
              repository
            }
          />
        )}

        {currentTab ===
          "files" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <RepositoryFileExplorer
                repositoryId={
                  repositoryId
                }
                selectedFile={
                  selectedFile
                }
                onSelect={(
                  file,
                ) => {
                  if (
                    file.type ===
                    "file"
                  ) {
                    handleFileSelect(
                      file.path,
                    );
                  }
                }}
              />
            </div>

            <div className="lg:col-span-9">
              <RepositoryCodeViewer
                repositoryId={
                  repositoryId
                }
                selectedFile={
                  selectedFile
                }
              />
            </div>
          </div>
        )}

        {currentTab ===
          "architecture" && (
          <ArchitectureViewer
            repository={
              repository
            }
          />
        )}

        {currentTab ===
          "assistant" && (
          <RepositoryAssistant
            repositoryId={
              repositoryId
            }
            repositoryName={
              repository.projectName
            }
          />
        )}

        {currentTab === "insights" && (
  <RepositoryInsights
    repository={repository}
  />
)}
      </div>
    </DashboardLayout>
  );
}