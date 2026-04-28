import { getLoggedInUser, isUserLoggedIn, logout } from "../../dashboard/services/dashboardAuthService";

export interface DashboardSessionUser {
  email: string;
  role: string;
  name?: string;
  surname?: string;
}

export const getSessionUser = (): DashboardSessionUser | null => {
  const user = getLoggedInUser();

  if (!user?.email || !user?.role) {
    return null;
  }

  return {
    email: user.email,
    role: normalizeRole(user.role),
    name: user.name?.trim() || "",
    surname: user.surname?.trim() || "",
  };
};

export const normalizeRole = (role?: string | null): string => {
  if (!role) return "";
  return role.replace(/^ROLE_/, "").trim().toUpperCase();
};

export const hasRequiredRole = (
  user: DashboardSessionUser | null,
  allowedRoles?: string[]
): boolean => {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  if (!user) return false;

  return allowedRoles
    .map((role) => normalizeRole(role))
    .includes(normalizeRole(user.role));
};

export const isAuthenticated = (): boolean => {
  return isUserLoggedIn();
};

export const clearSession = (): void => {
  logout();
};