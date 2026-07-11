import {
  Activity,
  Boxes,
  FileCode2,
  HardDrive,
  FolderGit2,
} from "lucide-react";

import DashboardWidget from "./DashboardWidget";

export default function DashboardWidgets() {
  return (
    <div className="grid grid-cols-5 gap-5">

      <DashboardWidget
        title="Repositories"
        value="12"
        subtitle="Total added"
        trend=""
        icon={FolderGit2}
      />

      <DashboardWidget
        title="Analyses Completed"
        value="28"
        subtitle="This month"
        trend=""
        icon={Activity}
      />

      <DashboardWidget
        title="Files Scanned"
        value="5,642"
        subtitle="+12%"
        trend=""
        icon={FileCode2}
      />

      <DashboardWidget
        title="Chunks Created"
        value="18,273"
        subtitle="+18%"
        trend=""
        icon={Boxes}
      />

      <DashboardWidget
        title="Storage Used"
        value="2.45 GB"
        subtitle="10 GB"
        trend="24%"
        icon={HardDrive}
      />

    </div>
  );
}