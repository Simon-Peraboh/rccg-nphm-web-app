import React from "react";
import { Navigate } from "react-router-dom";
import { getSessionUser, hasRequiredRole, isAuthenticated } from "../utils/authSession";

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const user = getSessionUser();

  if (!isAuthenticated()) {
    return <Navigate to="/dashboard/loginUser" replace />;
  }

  if (!hasRequiredRole(user, roles)) {
    return <Navigate to="/dashboard/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;