import type { RouteObject } from "react-router-dom";
import App from "../App";
import ConferenceProtectedRoute from "../dashboardconference/components/ConferenceProtectedRoute";
import AdminSidebarLayout from "../dashboardconference/components/AdminSidebarLayout";

import MemberDashboardPage from "../dashboardconference/pages/MemberDashboardPage";
import AdminAttendancePage from "../dashboardconference/pages/AdminAttendancePage";
import CreateAdminPage from "../dashboardconference/pages/CreateAdminPage";
import ConferenceEventPage from "../dashboardconference/pages/ConferenceEventPage";
import ConferenceActivityPage from "../dashboardconference/pages/ConferenceActivityPage";
import AdminSummaryPage from "../dashboardconference/pages/AdminSummaryPage";
import AttendanceRecordsPage from "../dashboardconference/pages/AttendanceRecordsPage";
import RegistrationRecordsPage from "../dashboardconference/pages/RegistrationRecordsPage";

export const conferenceRoutes: RouteObject[] = [
  {
    path: "/dashboardconference",
    element: (
      <ConferenceProtectedRoute>
        <App />
      </ConferenceProtectedRoute>
    ),
    children: [
      { path: "member", element: <MemberDashboardPage /> },

      {
        element: (
          <ConferenceProtectedRoute roles={["admin"]}>
            <AdminSidebarLayout />
          </ConferenceProtectedRoute>
        ),
        children: [
          { path: "admin", element: <AdminSummaryPage /> },
          { path: "admin-attendance", element: <AdminAttendancePage /> },
          { path: "admin-attendance-records", element: <AttendanceRecordsPage /> },
          { path: "admin-registrations", element: <RegistrationRecordsPage /> },
          { path: "create-admin", element: <CreateAdminPage /> },
          { path: "events", element: <ConferenceEventPage /> },
          { path: "activities", element: <ConferenceActivityPage /> },
        ],
      },
    ],
  },
];