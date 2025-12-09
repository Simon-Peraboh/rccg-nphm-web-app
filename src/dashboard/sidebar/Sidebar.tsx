// components/Sidebar.tsx

import React from 'react';
import { FaHome, FaAngleLeft, FaAngleRight, FaRegistered } from 'react-icons/fa';
import { MdLeaderboard } from "react-icons/md";
import { GiDatabase } from "react-icons/gi";
import { FcTodoList } from "react-icons/fc";
import { SiLibreofficewriter } from "react-icons/si";
import { TbReport, TbFileReport, TbReportMoney, TbMessageReport } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../services/AuthServiceLoginRegister';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const user = getLoggedInUser();
  console.log('Sidebar User:', user);

  const hasRole = (roles: string[]) => {
    if (!user) return false;
    const userRole = user.role?.replace('ROLE_', ''); // Ensure user.role is defined before replacing
    return roles.includes(userRole);
  };

  const secretaryNoteRoles = ['SUPER_ADMIN', 'SECRETARY'];
  const nationalDatabaseRoles = ['SUPER_ADMIN', 'ADMIN'];
  const monthlyDueReportRoles = ['SUPER_ADMIN', 'TREASURER'];
  const generalRoles = ['SUPER_ADMIN', 'SECRETARY', 'ADMIN', 'TREASURER', 'USER'];
  const onlyRoles = ['SUPER_ADMIN'];

  return (
    <div className={`h-screen ${isCollapsed ? 'w-16' : 'w-64'} bg-gray-500 text-white fixed flex flex-col transition-all duration-300`}>
      <div className="p-4 flex justify-between items-center">
        <span className="text-2xl font-bold">{!isCollapsed && 'Logo'}</span>
        <button onClick={onToggleCollapse} className="focus:outline-none">
          {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>
      <nav className="flex-grow px-4 py-2 space-y-2 overflow-y-auto">
        <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaHome />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        {hasRole(nationalDatabaseRoles) && (
          <Link to="/dashboard/userprofile" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <GiDatabase />
            {!isCollapsed && <span>National Database</span>}
          </Link>
        )}
         {hasRole(onlyRoles) && (
          <Link to="/dashboard/nationalReportTable" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <TbMessageReport />
            {!isCollapsed && <span>National Report</span>}
          </Link>
        )}
         {hasRole(generalRoles) && (
          <Link to="/dashboard/monthlyReportTable" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <TbFileReport />
            {!isCollapsed && <span>Monthly Report</span>}
          </Link>
        )}
        {hasRole(generalRoles) && (
          <Link to="/dashboard/specialProjectsTable" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <TbReport />
            {!isCollapsed && <span>Special Projects</span>}
          </Link>
        )}
        {hasRole(monthlyDueReportRoles) && (
          <Link to="/dashboard/monthlyDueTable" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <TbReportMoney />
            {!isCollapsed && <span>Monthly Due Report</span>}
          </Link>
        )}
        {hasRole(generalRoles) && (
          <Link to="/dashboard/conferenceTable" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FaRegistered />
            {!isCollapsed && <span>Conference Registration</span>}
          </Link>
        )}
        {hasRole(generalRoles) && (
          <Link to="/dashboard/todoListTable" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FcTodoList />
            {!isCollapsed && <span>TodoList</span>}
          </Link>
        )}
          {hasRole(secretaryNoteRoles) && (
          <Link to="/dashboard/secretaryNoteTable" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <SiLibreofficewriter />
            {!isCollapsed && <span>Secretary Note</span>}
          </Link>
        )}
        {hasRole(generalRoles) && (
          <Link to="/dashboard/stateCoordinators" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <MdLeaderboard  />
            {!isCollapsed && <span>State Coordinators</span>}
          </Link>
        )}
         {hasRole(onlyRoles) && (
          <Link to="/dashboard/registerUser" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <TbMessageReport />
            {!isCollapsed && <span>Register User</span>}
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
