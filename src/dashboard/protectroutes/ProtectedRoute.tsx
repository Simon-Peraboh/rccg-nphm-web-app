// components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn, getLoggedInUser } from '../services/AuthServiceLoginRegister';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const user = getLoggedInUser();
  console.log('User:', user);

  if (!isUserLoggedIn()) {
    return <Navigate to="/dashboard/loginUser" replace />;
  }

  if (roles && roles.length > 0) {
    const userRole = user?.role?.replace('ROLE_', ''); // Ensure user.role is defined before replacing
    if (!user || !userRole || !roles.includes(userRole)) {
      console.log('Unauthorized access attempt:', user?.role);
      return <Navigate to="/dashboard/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
