import React, { useState } from "react";
import Navbar from "../../dashboard/header/Navbar";
import Sidebar from "../../dashboard/sidebar/Sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        <Navbar />

        <main className="min-h-[calc(100vh-80px)] overflow-auto bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 px-4 py-5 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;