import React from "react";
import { Navigate } from "react-router-dom";
import {
  getConferenceToken,
  getConferenceUser,
} from "../services/conferenceManagerStorage";

interface ConferenceProtectedRouteProps {
  children: React.ReactNode;
  roles?: Array<"member" | "admin">;
}

const ConferenceProtectedRoute: React.FC<ConferenceProtectedRouteProps> = ({
  children,
  roles,
}) => {
  const token = getConferenceToken();
  const user = getConferenceUser();

  if (!token || !user) {
    return <Navigate to="/dashboardconference/login" replace />;
  }

  if (roles && roles.length > 0) {
    const isAllowed =
      user.role === "admin"
        ? roles.includes("admin") || roles.includes("member")
        : roles.includes("member");

    if (!isAllowed) {
      return (
        <Navigate
          to={user.role === "admin" ? "/dashboardconference/admin" : "/dashboardconference/member"}
          replace
        />
      );
    }
  }

  return <>{children}</>;
};

export default ConferenceProtectedRoute;