import {
  Activity,
  Boxes,
  Brain,
  Code2,
  FileCode2,
  FolderTree,
  GitBranch,
  Layers3,
  Network,
  Sparkles,
} from "lucide-react";

import type {
  RepositoryDetails,
} from "../../services/repository.service";


interface Props {
  repository: RepositoryDetails;
}


/*
|--------------------------------------------------------------------------
| Helper Types
|--------------------------------------------------------------------------
*/

interface RepositoryMetrics {
  totalFiles?: number;
  totalFolders?: number;
  totalLines?: number;
  totalFunctions?: number;
  files?: number;
  folders?: number;
  lines?: number;
  functions?: number;
}

interface GraphNode {
  id?: string;
  type?: string;
  name?: string;
}

interface GraphEdge {
  from?: string;
  to?: string;
  type?: string;
}

interface RepositoryGraph {
  nodes?: GraphNode[];
  edges?: GraphEdge[];
}


/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
*/

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}


function getTextValue(
  value: unknown,
  fallback = "Not available",
): string {
  if (
    typeof value === "string" &&
    value.trim()
  ) {
    return value;
  }

  return fallback;
}


function getSummaryText(
  summary: unknown,
): string {
  if (
    typeof summary === "string"
  ) {
    return summary;
  }

  if (isRecord(summary)) {
    const possibleValues = [
      summary.summary,
      summary.description,
      summary.overview,
      summary.projectSummary,
    ];

    for (
      const value
      of possibleValues
    ) {
      if (
        typeof value ===
          "string" &&
        value.trim()
      ) {
        return value;
      }
    }
  }

  return (
    "Repository analysis is available. " +
    "More detailed AI insights can be generated from the analyzed codebase."
  );
}


function getFrameworks(
  frameworks: unknown,
): string[] {
  if (
    Array.isArray(frameworks)
  ) {
    return frameworks
      .map((item) => {
        if (
          typeof item ===
          "string"
        ) {
          return item;
        }

        if (isRecord(item)) {
          const name =
            item.name ??
            item.framework;

          return typeof name ===
            "string"
            ? name
            : null;
        }

        return null;
      })
      .filter(
        (
          item,
        ): item is string =>
          Boolean(item),
      );
  }

  if (
    isRecord(frameworks)
  ) {
    return Object.entries(
      frameworks,
    )
      .filter(
        ([, value]) =>
          Boolean(value),
      )
      .map(
        ([key]) =>
          key,
      );
  }

  return [];
}


function getMetrics(
  metrics: unknown,
): RepositoryMetrics {
  if (!isRecord(metrics)) {
    return {};
  }

  return metrics as RepositoryMetrics;
}


function getRepositoryGraph(
  graph: unknown,
): RepositoryGraph {
  if (!isRecord(graph)) {
    return {};
  }

  return {
    nodes:
      Array.isArray(
        graph.nodes,
      )
        ? (
            graph.nodes as GraphNode[]
          )
        : [],

    edges:
      Array.isArray(
        graph.edges,
      )
        ? (
            graph.edges as GraphEdge[]
          )
        : [],
  };
}


/*
|--------------------------------------------------------------------------
| Metric Card
|--------------------------------------------------------------------------
*/

interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  icon:
    React.ComponentType<{
      size?: number;
      className?: string;
    }>;
}


function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-indigo-500/30 hover:bg-white/[0.04]">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <Icon size={20} />
        </div>

        <Activity
          size={16}
          className="text-emerald-400"
        />
      </div>

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-600">
        {description}
      </p>
    </div>
  );
}


/*
|--------------------------------------------------------------------------
| Repository Insights
|--------------------------------------------------------------------------
*/

export default function RepositoryInsights({
  repository,
}: Props) {
  const metrics =
    getMetrics(
      repository.metrics,
    );

  const graph =
    getRepositoryGraph(
      repository.repositoryGraph,
    );

  const frameworks =
    getFrameworks(
      repository.frameworks,
    );

  const summary =
    getSummaryText(
      repository.summary,
    );

  const nodes =
    graph.nodes ?? [];

  const edges =
    graph.edges ?? [];

  /*
  |--------------------------------------------------------------------------
  | Graph Statistics
  |--------------------------------------------------------------------------
  */

  const functionCount =
    nodes.filter(
      (node) =>
        node.type ===
          "function" ||
        node.type ===
          "arrow-function" ||
        node.type ===
          "method",
    ).length;

  const fileNodeCount =
    nodes.filter(
      (node) =>
        node.type ===
        "file",
    ).length;

  const dependencyCount =
    edges.filter(
      (edge) =>
        edge.type ===
          "imports" ||
        edge.type ===
          "external",
    ).length;

  const callCount =
    edges.filter(
      (edge) =>
        edge.type ===
        "calls",
    ).length;

  /*
  |--------------------------------------------------------------------------
  | Metric Fallbacks
  |--------------------------------------------------------------------------
  */

  const totalFiles =
    metrics.totalFiles ??
    metrics.files ??
    fileNodeCount ??
    0;

  const totalFolders =
    metrics.totalFolders ??
    metrics.folders ??
    0;

  const totalLines =
    metrics.totalLines ??
    metrics.lines ??
    0;

  const totalFunctions =
    metrics.totalFunctions ??
    metrics.functions ??
    functionCount ??
    0;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-violet-500/[0.05] p-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-indigo-400">
            <Sparkles
              size={18}
            />

            <span className="text-sm font-medium">
              Repository Intelligence
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Codebase Insights
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Analysis generated from
            the structure,
            dependencies, functions,
            and metadata of{" "}
            <span className="font-medium text-zinc-200">
              {
                repository.projectName
              }
            </span>
            .
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          Analysis Available
        </div>
      </div>

      {/* Metrics */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Files"
          value={totalFiles}
          description="Files discovered during repository analysis."
          icon={FileCode2}
        />

        <MetricCard
          title="Folders"
          value={totalFolders}
          description="Directories detected in the repository structure."
          icon={FolderTree}
        />

        <MetricCard
          title="Functions"
          value={totalFunctions}
          description="Functions and callable units identified in the codebase."
          icon={Code2}
        />

        <MetricCard
          title="Dependencies"
          value={
            dependencyCount
          }
          description="Internal and external dependency relationships."
          icon={Network}
        />
      </div>

      {/* Summary + Architecture */}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <Brain
                size={20}
              />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Repository Summary
              </h3>

              <p className="text-xs text-zinc-500">
                Generated from
                repository analysis
              </p>
            </div>
          </div>

          <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-400">
            {summary}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Layers3
                size={20}
              />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Architecture
              </h3>

              <p className="text-xs text-zinc-500">
                Detected project
                structure
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-600">
                Project Type
              </p>

              <p className="mt-2 font-medium text-zinc-200">
                {repository.projectType ??
                  "Unknown"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-600">
                Architecture
              </p>

              <p className="mt-2 font-medium text-zinc-200">
                {getTextValue(
                  repository.architecture,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Statistics */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.02]">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <GitBranch
                size={20}
              />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Code Graph
                Statistics
              </h3>

              <p className="text-xs text-zinc-500">
                Relationships detected
                across the codebase
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label:
                "Graph Nodes",
              value:
                nodes.length,
            },
            {
              label:
                "Graph Edges",
              value:
                edges.length,
            },
            {
              label:
                "Function Calls",
              value:
                callCount,
            },
            {
              label:
                "Dependencies",
              value:
                dependencyCount,
            },
          ].map(
            (item) => (
              <div
                key={
                  item.label
                }
                className="bg-[#0B0D14] p-6"
              >
                <p className="text-sm text-zinc-500">
                  {
                    item.label
                  }
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  {
                    item.value
                  }
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Frameworks */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Boxes
              size={20}
            />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Technologies &
              Frameworks
            </h3>

            <p className="text-xs text-zinc-500">
              Detected during
              repository analysis
            </p>
          </div>
        </div>

        {frameworks.length >
        0 ? (
          <div className="flex flex-wrap gap-3">
            {frameworks.map(
              (framework) => (
                <span
                  key={
                    framework
                  }
                  className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300"
                >
                  {
                    framework
                  }
                </span>
              ),
            )}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">
            No framework
            information is
            available for this
            repository.
          </p>
        )}
      </div>

      {/* Additional Statistics */}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-sm text-zinc-500">
            Lines of Code
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {totalLines}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-sm text-zinc-500">
            Repository Graph
            Relationships
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {edges.length}
          </p>
        </div>
      </div>
    </div>
  );
}