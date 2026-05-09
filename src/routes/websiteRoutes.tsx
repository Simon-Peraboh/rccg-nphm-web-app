import type { RouteObject } from "react-router-dom";
import App from "../App";

import HomePage from "../components/home/Home";
import InAction from "../pages/in-action/InAction";
import HopOnboard from "../pages/hop-onboard/HopOnboard";
import WeAre from "../pages/we-are/WeAre";
import Conference from "../pages/conference/Conference";
import Connect from "../pages/connect/Connect";
import Report from "../pages/report/Report";
<<<<<<< HEAD
import Blog from "../pages/blog/Blog";
import Contact from "../pages/connect/Connect";
=======
import Contact from "../pages/contact-us/Contact";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
import Donation from "../pages/donation/Donation";
import ConferenceRegistrationPage from "../dashboardconference/pages/ConferenceRegistrationPage";
import MemberLoginPage from "../dashboardconference/pages/MemberLoginPage";
import AdminLoginPage from "../dashboardconference/pages/AdminLoginPage";
<<<<<<< HEAD
import ConferenceForgotPasswordPage from "../dashboardconference/pages/ConferenceForgotPasswordPage";
=======
import ConferenceForgotPasswordPage from "../dashboardconference/pages/ConferenceForgotPasswordPage  ConferenceResetPasswordPage";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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
<<<<<<< HEAD
      { path: "Blog", element: <Blog /> },
      { path: "Contact", element: <Contact /> },
=======
      { path: "Contact", element: <Contact /> },
      { path: "contact", element: <Contact /> },
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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


