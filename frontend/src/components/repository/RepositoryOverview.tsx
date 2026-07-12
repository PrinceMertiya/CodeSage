import type {
  RepositoryDetails,
} from "../../services/repository.service";

import CodebaseSummary from "./CodebaseSummary";
import LanguageDistribution from "./LanguageDistribution";
import RepositoryHealth from "./RepositoryHealth";
import RecentActivity from "./RecentActivity";


interface Props {
  repository: RepositoryDetails;
}


const getNumber = (
  value: unknown,
  fallback = 0,
) => {
  return typeof value === "number"
    ? value
    : fallback;
};


export default function RepositoryOverview({
  repository,
}: Props) {

  const metrics =
    repository.metrics ?? {};

  const summaryData =
    repository.summary ?? {};


  /*
  |--------------------------------------------------------------------------
  | Codebase Summary
  |--------------------------------------------------------------------------
  */

  const summary = [
    {
      title: "Files",

      value: String(
        getNumber(
          metrics.totalFiles ??
          summaryData.totalFiles,
        ),
      ),
    },

    {
      title: "Folders",

      value: String(
        getNumber(
          metrics.totalFolders ??
          summaryData.totalFolders,
        ),
      ),
    },

    {
      title: "Lines",

      value: String(
        getNumber(
          metrics.totalLines ??
          summaryData.totalLines,
        ),
      ),
    },

    {
      title: "Functions",

      value: String(
        getNumber(
          metrics.totalFunctions ??
          summaryData.totalFunctions,
        ),
      ),
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | Language Distribution
  |--------------------------------------------------------------------------
  */

  const rawLanguages =
    metrics.languages ??
    metrics.languageDistribution ??
    summaryData.languages;


  const languageData: {
    name: string;
    value: number;
  }[] = [];


  if (
    rawLanguages &&
    typeof rawLanguages === "object" &&
    !Array.isArray(rawLanguages)
  ) {

    const entries =
      Object.entries(rawLanguages);


    const total =
      entries.reduce(
        (sum, [, value]) =>
          sum +
          (
            typeof value === "number"
              ? value
              : 0
          ),
        0,
      );


    if (total > 0) {

      for (
        const [name, value]
        of entries
      ) {

        if (
          typeof value === "number"
        ) {

          languageData.push({

            name,

            value:
              Math.round(
                (value / total) * 100,
              ),

          });

        }

      }

    }

  }


  /*
  |--------------------------------------------------------------------------
  | Repository Health
  |--------------------------------------------------------------------------
  */

  const deadCode =
    getNumber(
      metrics.deadCode ??
      metrics.deadCodeCount,
    );

  const circularDependencies =
    getNumber(
      metrics.circularDependencies ??
      metrics.circularDependencyCount,
    );


  const repositoryHealth = [

    {
      title: "Architecture",

      value:
        repository.architecture ??
        "Detected",

      color: "violet",
    },

    {
      title: "Dead Code",

      value:
        deadCode === 0
          ? "None"
          : String(deadCode),

      color:
        deadCode === 0
          ? "emerald"
          : "violet",
    },

    {
      title:
        "Circular Dependencies",

      value:
        circularDependencies === 0
          ? "None"
          : String(
              circularDependencies,
            ),

      color:
        circularDependencies === 0
          ? "emerald"
          : "violet",
    },

  ];


  /*
  |--------------------------------------------------------------------------
  | Analysis Activity
  |--------------------------------------------------------------------------
  */

  const recentActivity = [

    "Repository analysis completed",

    repository.architectureDiagram
      ? "Architecture generated"
      : "Architecture analyzed",

    repository.repositoryGraph
      ? "Repository graph generated"
      : "Repository structure analyzed",

    "Repository files indexed",

  ];


  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <CodebaseSummary
        summary={summary}
      />


      <LanguageDistribution
        data={languageData}
      />


      <RepositoryHealth
        health={repositoryHealth}
      />


      <RecentActivity
        activities={recentActivity}
      />

    </div>
  );
}