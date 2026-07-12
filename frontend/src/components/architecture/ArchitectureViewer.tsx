import {
  useMemo,
  useState,
} from "react";

import {
  Boxes,
  Code2,
  GitBranch,
  Network,
} from "lucide-react";

import type {
  RepositoryDetails,
} from "../../services/repository.service";

import ArchitectureDiagram from "./ArchitectureDiagram";
import ArchitectureToolbar from "./ArchitectureToolbar";

type DiagramType =
  | "architecture"
  | "repository"
  | "functions"
  | "execution";

interface Props {
  repository: RepositoryDetails;
}

const diagramTabs = [
  {
    id: "architecture",
    label: "Architecture",
    icon: Boxes,
  },
  {
    id: "repository",
    label: "Repository Graph",
    icon: Network,
  },
  {
    id: "functions",
    label: "Functions",
    icon: Code2,
  },
  {
    id: "execution",
    label: "Execution Flow",
    icon: GitBranch,
  },
] satisfies {
  id: DiagramType;
  label: string;
  icon: typeof Boxes;
}[];

export default function ArchitectureViewer({
  repository,
}: Props) {
  const [
    activeDiagram,
    setActiveDiagram,
  ] = useState<DiagramType>(
    "architecture",
  );

  const [zoom, setZoom] =
    useState(1);

  const diagram = useMemo(() => {
    switch (activeDiagram) {
      case "repository":
        return (
          repository.repositoryDiagram ??
          ""
        );

      case "functions":
        return (
          repository.functionDiagram ??
          ""
        );

      case "execution":
        return (
          repository.executionDiagram ??
          ""
        );

      case "architecture":
      default:
        return (
          repository.architectureDiagram ??
          ""
        );
    }
  }, [
    activeDiagram,
    repository,
  ]);

  const activeTab =
    diagramTabs.find(
      (tab) =>
        tab.id === activeDiagram,
    );

  const zoomIn = () => {
    setZoom((current) =>
      Math.min(
        current + 0.1,
        2,
      ),
    );
  };

  const zoomOut = () => {
    setZoom((current) =>
      Math.max(
        current - 0.1,
        0.5,
      ),
    );
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Architecture Explorer
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Explore the generated structure,
              dependencies, functions, and execution
              flow of this repository.
            </p>
          </div>

          <ArchitectureToolbar
            zoom={zoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={resetZoom}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {diagramTabs.map((tab) => {
            const Icon = tab.icon;

            const isActive =
              activeDiagram === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveDiagram(
                    tab.id,
                  );

                  setZoom(1);
                }}
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                      : "border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon size={16} />

                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0D1117]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h3 className="font-semibold">
              {activeTab?.label}
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              Generated from repository analysis
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs text-zinc-500">
              Generated
            </span>
          </div>
        </div>

        {!diagram.trim() ? (
          <div className="flex min-h-[600px] items-center justify-center p-8">
            <div className="max-w-md text-center">
              <Network
                size={56}
                className="mx-auto text-zinc-700"
              />

              <h3 className="mt-5 text-xl font-semibold">
                Diagram unavailable
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                This diagram was not generated during
                repository analysis. Reanalyze the
                repository to generate the latest
                architecture information.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-auto">
            <div
              className="origin-top-left transition-transform duration-200"
              style={{
                transform: `scale(${zoom})`,
              }}
            >
              <ArchitectureDiagram
                key={`${activeDiagram}-${diagram}`}
                chart={diagram}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}