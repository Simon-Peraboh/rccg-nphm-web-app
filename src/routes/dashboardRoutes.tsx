import type { RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../dashboard/protectroutes/ProtectedRoute";

import Dashboard from "../dashboard/DashboardHome";
import UserProfileTable from "../dashboard/userprofile/UserProfileTable";
import UserProfileTableView from "../dashboard/userprofile/UserProfileView";
import UserProfileEdit from "../dashboard/userprofile/UserProfileEdit";
import RegisterUser from "../dashboard/register_login_detail/RegisterUser";

import MonthlyDueCreate from "../dashboard/monthlydue/MonthlyDueCreate";
import MonthlyDueEdit from "../dashboard/monthlydue/MonthlyDueEdit";
import MonthlyDueView from "../dashboard/monthlydue/MonthlyDueView";
import MonthlyDueTable from "../dashboard/monthlydue/MonthlyDueTable";

import MonthlyReportCreate from "../dashboard/monthlyreport/MonthlyReport";
import MonthlyReportTable from "../dashboard/monthlyreport/MonthlyReportTable";
import MonthlyReportEdit from "../dashboard/monthlyreport/MonthlyReportEdit";
import MonthlyReportView from "../dashboard/monthlyreport/MonthlyReportView";

import NationalReportCreate from "../dashboard/nationalreport/NationalReportCreate";
import NationalReportTable from "../dashboard/nationalreport/NationalReportTable";
import NationalReportView from "../dashboard/nationalreport/NationalReportView";
import NationalReportEdit from "../dashboard/nationalreport/NationalReportEdit";

import SecretaryNoteCreate from "../dashboard/secretarynote/SecretaryNoteCreate";
import SecretaryNoteTable from "../dashboard/secretarynote/SecretaryNoteTable";
import SecretaryNoteView from "../dashboard/secretarynote/SecretaryNoteView";
import SecretaryNoteEdit from "../dashboard/secretarynote/SecretaryNoteEdit";

import SpecialProjectsCreate from "../dashboard/specialproject/SpecialProjectsCreate";
import SpecialProjectsTable from "../dashboard/specialproject/SpecialProjectsTable";
import SpecialProjectsView from "../dashboard/specialproject/SpecialProjectsView";
import SpecialProjectsEdit from "../dashboard/specialproject/SpecialProjectsEdit";

import QuarterlyReportCreate from "../dashboard/quarterlyreport/QuarterlyReportCreate";
import QuarterlyReportTable from "../dashboard/quarterlyreport/QuarterlyReportTable";
import QuarterlyReportEdit from "../dashboard/quarterlyreport/QuarterlyReportEdit";
import QuarterlyReportView from "../dashboard/quarterlyreport/QuarterlyReportView";
import QuarterlyReportTable2 from "../dashboard/quarterlyreport/QuarterlyReportTable2";

import TodoListTable from "../dashboard/todolist/TodoListTable";
import TodoListCreate from "../dashboard/todolist/TodoListCreate";
import TodoListEdit from "../dashboard/todolist/TodoListEdit";

import LoginUser from "../dashboard/register_login_detail/LoginUser";
import Unauthorized from "../dashboard/register_login_detail/Unauthorized";
import RegisterProfileCreate from "../dashboard/userprofile/RegisterProfileCreate";
import StateCoordinatorForm from "../dashboard/statecoord/StateCoordinatorForm";
import MonthlyReport from "../dashboard/monthlyreport/MonthlyReport";
import AccountActivation from "../dashboard/register_login_detail/AccountActivation";
import ForgotPassword from "../dashboard/register_login_detail/ForgetPassword";
import ResetPassword from "../dashboard/register_login_detail/ResetPassword";
import TodoViewPage from "../dashboard/todolist/TodoViewPage";
import MinistryActivityAdminPage from "../dashboard/ministryactivies/MinistryActivityAdminPage";
import MinistryActivityEdit from "../dashboard/ministryactivies/MinistryActivityEdit";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },

      { path: "userprofile", element: <UserProfileTable /> },
      { path: "userprofileView/:id", element: <UserProfileTableView /> },
      { path: "userprofileEdit/:id", element: <UserProfileEdit /> },

      { path: "registerUser", element: <ProtectedRoute roles={["SUPER_ADMIN"]}><RegisterUser /></ProtectedRoute> },

      { path: "monthlyDue", element: <ProtectedRoute roles={["SUPER_ADMIN", "TREASURER", "ADMIN"]}><MonthlyDueCreate /></ProtectedRoute> },
      { path: "monthlyDueEdit/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "TREASURER", "ADMIN"]}><MonthlyDueEdit /></ProtectedRoute> },
      { path: "monthlyDueView/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "TREASURER", "ADMIN"]}><MonthlyDueView /></ProtectedRoute> },
      { path: "monthlyDueTable", element: <ProtectedRoute roles={["SUPER_ADMIN", "TREASURER", "ADMIN"]}><MonthlyDueTable /></ProtectedRoute> },

      { path: "monthlyReportCreate", element: <ProtectedRoute roles={["SUPER_ADMIN", "TREASURER", "SECRETARY", "ADMIN", "USER"]}><MonthlyReportCreate /></ProtectedRoute> },
      { path: "monthlyReportTable", element: <ProtectedRoute roles={["SUPER_ADMIN", "TREASURER", "SECRETARY", "ADMIN", "USER"]}><MonthlyReportTable /></ProtectedRoute> },
      { path: "monthlyReportEdit/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "TREASURER", "SECRETARY", "ADMIN", "USER"]}><MonthlyReportEdit /></ProtectedRoute> },
      { path: "monthlyReportView/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "TREASURER", "SECRETARY", "ADMIN", "USER"]}><MonthlyReportView /></ProtectedRoute> },

      { path: "nationalReportCreate", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><NationalReportCreate /></ProtectedRoute> },
      { path: "nationalReportTable", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><NationalReportTable /></ProtectedRoute> },
      { path: "nationalReportView/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><NationalReportView /></ProtectedRoute> },
      { path: "nationalReportEdit/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><NationalReportEdit /></ProtectedRoute> },

      { path: "secretaryNoteCreate", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "ADMIN"]}><SecretaryNoteCreate /></ProtectedRoute> },
      { path: "secretaryNoteTable", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "ADMIN"]}><SecretaryNoteTable /></ProtectedRoute> },
      { path: "secretaryNoteView/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "ADMIN"]}><SecretaryNoteView /></ProtectedRoute> },
      { path: "secretaryNoteEdit/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "ADMIN"]}><SecretaryNoteEdit /></ProtectedRoute> },

      { path: "specialProjectsCreate", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "TREASURER", "ADMIN", "USER"]}><SpecialProjectsCreate /></ProtectedRoute> },
      { path: "specialProjectsTable", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "TREASURER", "ADMIN", "USER"]}><SpecialProjectsTable /></ProtectedRoute> },
      { path: "specialProjectsView/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "TREASURER", "ADMIN", "USER"]}><SpecialProjectsView /></ProtectedRoute> },
      { path: "specialProjectsEdit/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "TREASURER", "ADMIN", "USER"]}><SpecialProjectsEdit /></ProtectedRoute> },

      { path: "quarterlyReportCreate", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><QuarterlyReportCreate /></ProtectedRoute> },
      { path: "quarterlyReportTable", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><QuarterlyReportTable /></ProtectedRoute> },
      { path: "quarterlyReportEdit/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><QuarterlyReportEdit /></ProtectedRoute> },
      { path: "quarterlyReportView/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><QuarterlyReportView /></ProtectedRoute> },
      { path: "quarterlyReportTable2", element: <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}><QuarterlyReportTable2 /></ProtectedRoute> },

      { path: "todoListTable", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "TREASURER", "ADMIN", "USER"]}><TodoListTable /></ProtectedRoute> },
      { path: "todoListCreate", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "TREASURER", "ADMIN", "USER"]}><TodoListCreate /></ProtectedRoute> },
      { path: "todoListEdit/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "TREASURER", "ADMIN", "USER"]}><TodoListEdit /></ProtectedRoute> },
      { path: "todoListView/:id", element: <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "TREASURER", "ADMIN", "USER"]}><TodoViewPage /></ProtectedRoute> },
      {
        path: "ministryActivities",
        element: (
          <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "ADMIN", "TREASURER", "USER"]}>
            <MinistryActivityAdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "ministryActivities",
        element: (
          <ProtectedRoute roles={["SUPER_ADMIN", "SECRETARY", "ADMIN", "TREASURER", "USER"]}>
            <MinistryActivityEdit />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Existing standalone / legacy dashboard routes
  { path: "/dashboard/loginUser", element: <LoginUser /> },
  { path: "/dashboard/unauthorized", element: <Unauthorized /> },
  { path: "/dashboard/register", element: <RegisterProfileCreate /> },
  { path: "/dashboard/stateCoordinators", element: <StateCoordinatorForm /> },
  { path: "/dashboard/monthlyReportCreate", element: <MonthlyReportCreate /> },
  { path: "/dashboard/monthlyReport", element: <MonthlyReport /> },
  { path: "/dashboard/accountActivation", element: <AccountActivation /> },
  { path: "/dashboard/forgetPassword", element: <ForgotPassword /> },
  { path: "/dashboard/resetPassword", element: <ResetPassword /> },
];