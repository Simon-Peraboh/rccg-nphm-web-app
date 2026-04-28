import { dashboardApi } from "../lib/axios";
import type {
  ActivateAccountDTO,
  ApiMessageResponse,
  ForgotPasswordDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from "../types/auth";
import type {
  DashboardAuthResponse,
  DashboardLoginDTO,
  DashboardLoggedInUser,
} from "../types/dashboard";

const TOKEN_KEY = "dashboard_token";
const USER_KEY = "dashboard_user";

export const loginDashboardAPICall = async (
  payload: DashboardLoginDTO
): Promise<DashboardAuthResponse> => {
  const response = await dashboardApi.post<DashboardAuthResponse>("/userManager/login", {
    email: payload.usernameOrEmail,
    password: payload.password,
  });

  return response.data;
};

export const registerDashboardAPICall = async (
  payload: RegisterDTO
): Promise<ApiMessageResponse> => {
  const response = await dashboardApi.post<ApiMessageResponse>("/userManager/createUser", payload);
  return response.data;
};

export const activateDashboardAccountAPICall = async (
  payload: ActivateAccountDTO
): Promise<ApiMessageResponse> => {
  const response = await dashboardApi.post<ApiMessageResponse>(
    "/userManager/accountActivation",
    payload
  );
  return response.data;
};

export const forgotDashboardPasswordAPICall = async (
  payload: ForgotPasswordDTO
): Promise<ApiMessageResponse> => {
  const response = await dashboardApi.post<ApiMessageResponse>(
    "/userManager/forgotPassword",
    payload
  );
  return response.data;
};

export const resetDashboardPasswordAPICall = async (
  payload: ResetPasswordDTO
): Promise<ApiMessageResponse> => {
  const response = await dashboardApi.post<ApiMessageResponse>(
    "/userManager/resetPassword",
    payload
  );
  return response.data;
};

export const storeToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveLoggedInUser = (user: DashboardLoggedInUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getLoggedInUser = (): DashboardLoggedInUser | null => {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as DashboardLoggedInUser;
  } catch {
    return null;
  }
};

export const isUserLoggedIn = (): boolean => {
  return !!getToken();
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const clearSession = (): void => {
  logout();
};