import {
  summary,
  repositoryHealth,
  recentActivity,
} from "../../constants/repositoryDetails";

import { languageData } from "../../constants/dashboard";

import CodebaseSummary from "./CodebaseSummary";
import LanguageDistribution from "./LanguageDistribution";
import RepositoryHealth from "./RepositoryHealth";
import RecentActivity from "./RecentActivity";

export default function RepositoryOverview() {
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