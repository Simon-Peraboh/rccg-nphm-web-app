import React from "react";
import DashboardShell from "../components/dash/DashboardShell";
import DashboardHeader from "../components/dash/DashboardHeader";
import DashboardOverview from "../dashboard/widget/DashboardOverview";

const DashboardHome: React.FC = () => {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <DashboardHeader />
        <DashboardOverview />
      </div>
    </DashboardShell>
  );
};

export default DashboardHome;