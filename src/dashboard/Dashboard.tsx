import React, { useState } from 'react';
import Navbar from './header/Navbar';
import Sidebar from './sidebar/Sidebar';
import WidgetComponent from './widget/WidgetComponent';
//import UserProfileTable from './userprofile/UserProfileTable';

const Dashboard: React.FC = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


 return (
  <div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className={`flex flex-col flex-grow transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Navbar />
        <main className="flex-grow p-4 overflow-auto bg-gray-300">
          <WidgetComponent />
          {/* <h1>User Profile Table</h1>
          <UserProfileTable /> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
