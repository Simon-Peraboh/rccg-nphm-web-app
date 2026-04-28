import type { RouteObject } from "react-router-dom";
import App from "../App";

import HomePage from "../components/home/Home";
import InAction from "../pages/in-action/InAction";
import HopOnboard from "../pages/hop-onboard/HopOnboard";
import WeAre from "../pages/we-are/WeAre";
import Conference from "../pages/conference/Conference";
import Connect from "../pages/connect/Connect";
import Report from "../pages/report/Report";
import Blog from "../pages/blog/Blog";
import Contact from "../pages/connect/Connect";
import Donation from "../pages/donation/Donation";
import ConferenceRegistrationPage from "../dashboardconference/pages/ConferenceRegistrationPage";
import MemberLoginPage from "../dashboardconference/pages/MemberLoginPage";
import AdminLoginPage from "../dashboardconference/pages/AdminLoginPage";
import ConferenceForgotPasswordPage from "../dashboardconference/pages/ConferenceForgotPasswordPage";
import ConferenceResetPasswordPage from "../dashboardconference/pages/ConferenceResetPasswordPage";

export const websiteRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "InAction", element: <InAction /> },
      { path: "HopOnboard", element: <HopOnboard /> },
      { path: "WeAre", element: <WeAre /> },
      { path: "Conference", element: <Conference /> },
      { path: "Connect", element: <Connect /> },
      { path: "Report", element: <Report /> },
      { path: "Blog", element: <Blog /> },
      { path: "Contact", element: <Contact /> },
      { path: "Donation", element: <Donation /> },

      // Public conference entry points
      { path: "ConferenceRegistration", element: <ConferenceRegistrationPage /> },
      { path: "dashboardconference/login", element: <MemberLoginPage /> },
      { path: "dashboardconference/admin-login", element: <AdminLoginPage /> },
      { path: "dashboardconference/forgot-password", element: <ConferenceForgotPasswordPage /> },
      { path: "dashboardconference/reset-password", element: <ConferenceResetPasswordPage /> },
    ],
  },
];


