import React from "react";
import { NavLink } from "react-router-dom";
import { FaBullhorn, FaHome, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { GiDatabase } from "react-icons/gi";
import { FcTodoList } from "react-icons/fc";
import { SiLibreofficewriter } from "react-icons/si";
import { TbReport, TbFileReport, TbReportMoney, TbMessageReport } from "react-icons/tb";
import { getSessionUser, hasRequiredRole } from "../utils/authSession";
import { HiOutlinePhotograph } from "react-icons/hi";
import { RiArticleLine } from "react-icons/ri";
import { IN_ACTION_POST_ACCESS_ROLES } from "../utils/accessLevels";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface SidebarItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  roles?: string[];
}

const sidebarItems: SidebarItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
  {
    to: "/dashboard/userprofile",
    label: "National Database",
    icon: <GiDatabase />,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    to: "/dashboard/nationalReportTable",
    label: "National Report",
    icon: <TbMessageReport />,
    roles: ["SUPER_ADMIN"],
  },
  {
    to: "/dashboard/monthlyReportTable",
    label: "Monthly Report",
    icon: <TbFileReport />,
    roles: ["SUPER_ADMIN", "SECRETARY", "ADMIN", "TREASURER", "USER"],
  },
  {
    to: "/dashboard/quarterlyReportTable",
    label: "Quarterly Report",
    icon: <TbReport />,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    to: "/dashboard/specialProjectsTable",
    label: "Special Projects",
    icon: <TbReport />,
    roles: ["SUPER_ADMIN", "SECRETARY", "ADMIN", "TREASURER", "USER"],
  },
  {
    to: "/dashboard/ministryActivities",
    label: "Ministry Activities",
    icon: <HiOutlinePhotograph />,
    roles: ["SUPER_ADMIN", "SECRETARY", "ADMIN", "TREASURER", "USER"],
  },
  {
    to: "/dashboard/inActionPosts",
    label: "In Action Posts",
    icon: <RiArticleLine />,
    roles: IN_ACTION_POST_ACCESS_ROLES,
  },
  {
    to: "/dashboard/upcomingPrograms",
    label: "Upcoming Program",
    icon: <FaBullhorn />,
    roles: ["SUPER_ADMIN", "SECRETARY", "ADMIN"],
  },
  {
    to: "/dashboard/monthlyDueTable",
    label: "Monthly Due Report",
    icon: <TbReportMoney />,
    roles: ["SUPER_ADMIN", "TREASURER"],
  },
  {
    to: "/dashboard/todoListTable",
    label: "Todo List",
    icon: <FcTodoList />,
    roles: ["SUPER_ADMIN", "SECRETARY", "ADMIN", "TREASURER", "USER"],
  },
  {
    to: "/dashboard/secretaryNoteTable",
    label: "Secretary Note",
    icon: <SiLibreofficewriter />,
    roles: ["SUPER_ADMIN", "SECRETARY"],
  },
  {
    to: "/dashboard/stateCoordinators",
    label: "State Coordinators",
    icon: <MdLeaderboard />,
    roles: ["SUPER_ADMIN", "SECRETARY", "ADMIN", "TREASURER", "USER"],
  },
  {
    to: "/dashboard/registerUser",
    label: "Register User",
    icon: <TbMessageReport />,
    roles: ["SUPER_ADMIN"],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const user = getSessionUser();

  const visibleItems = sidebarItems.filter((item) =>
    hasRequiredRole(user, item.roles)
  );

  return (
    <aside
      className={`fixed inset-y-0 left-0 top-0 z-30 flex flex-col border-r border-slate-200 bg-slate-950 text-white shadow-2xl transition-all duration-300 dark:border-slate-800 ${isCollapsed ? "w-20" : "w-72"
        }`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
        <div className="overflow-hidden">
          {!isCollapsed ? (
            <>
              <h1 className="text-xl font-bold tracking-tight">RCCG NPHM</h1>
              {/* <p className="text-xs text-slate-400">Flagship Admin Console</p> */}
            </>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-black">
              N
            </div>
          )}
        </div>

        <button
          type="button"
          title="Toggle sidebar"
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar"
          className="rounded-xl border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800"
        >
          {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!isCollapsed && user && (
        <div className="border-t border-slate-800 px-4 py-4">
          <div className="rounded-2xl bg-slate-900 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Signed in
            </p>
            <p className="mt-2 truncate text-sm font-semibold text-slate-200">
              {user.email}
            </p>
            <p className="mt-1 text-xs text-cyan-400">{user.role}</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
