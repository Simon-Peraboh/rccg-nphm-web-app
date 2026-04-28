import { createBrowserRouter } from "react-router-dom";
import { websiteRoutes } from "./websiteRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { conferenceRoutes } from "./conferenceRoutes";

export const router = createBrowserRouter([
  ...websiteRoutes,
  ...dashboardRoutes,
  ...conferenceRoutes,
]);