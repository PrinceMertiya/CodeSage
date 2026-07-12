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
} from "react-router-dom";

import RepositoryAssistant from "../../components/assistant/RepositoryAssistant";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

import RepositoryHeader from "../../components/repository/RepositoryHeader";
import RepositoryTabs from "../../components/repository/RepositoryTabs";
import RepositoryOverview from "../../components/repository/RepositoryOverview";
import RepositoryFileExplorer from "../../components/repository/RepositoryFileExplorer";
import RepositoryCodeViewer from "../../components/repository/RepositoryCodeViewer";

import {
  RepositoryService,
} from "../../services/repository.service";

import type {
  RepositoryDetails,
} from "../../services/repository.service";


import ArchitectureViewer from "../../components/architecture/ArchitectureViewer";


export default function RepositoryDetailsPage() {

  const location =
    useLocation();

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


  const [
    repository,
    setRepository,
  ] = useState<
    RepositoryDetails | null
  >(null);


  const [
    selectedFile,
    setSelectedFile,
  ] = useState<string>();


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
  | Header View Model
  |--------------------------------------------------------------------------
  */



  const getRepositoryOwner = (
  repositoryUrl: string,
) => {
  try {
    const url = new URL(repositoryUrl);

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

                    setSelectedFile(
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


        {currentTab === "architecture" && (
  <ArchitectureViewer
    repository={repository}
  />
)}

{/* console.log("ARCHITECTURE DIAGRAMS", {
  architectureDiagram:
    response.data.repository.architectureDiagram,

  repositoryDiagram:
    response.data.repository.repositoryDiagram,

  functionDiagram:
    response.data.repository.functionDiagram,

  executionDiagram:
    response.data.repository.executionDiagram,
}); */}

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
  <div className="rounded-3xl border border-white/10 p-16 text-center">
    Insights Coming Soon
  </div>
)}

        {currentTab ===
          "assistant" && (

          <div className="rounded-3xl border border-white/10 p-16 text-center">

            AI Assistant
            Coming Soon

          </div>

        )}


        {currentTab ===
          "insights" && (

          <div className="rounded-3xl border border-white/10 p-16 text-center">

            Insights
            Coming Soon

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}