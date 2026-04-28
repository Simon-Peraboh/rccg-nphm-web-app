import React from "react";
import { Navigate } from "react-router-dom";
import {
  getConferenceToken,
  getConferenceUserRole,
} from "../services/conferenceManagerStorage";

const ConferenceRoleRedirect: React.FC = () => {
  const token = getConferenceToken();
  const role = getConferenceUserRole();

  if (!token || !role) {
    return <Navigate to="/dashboardconference/login" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/dashboardconference/admin" replace />;
  }

  return <Navigate to="/dashboardconference/member" replace />;
};

export default ConferenceRoleRedirect;