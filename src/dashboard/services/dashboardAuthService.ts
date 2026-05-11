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

const toRecord = (value: unknown): Record<string, unknown> | null => {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
};

const parseJsonFromMixedResponse = (value: unknown): unknown => {
  if (typeof value !== "string") {
    return value;
  }

  const firstBrace = value.indexOf("{");
  const lastBrace = value.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace <= firstBrace) {
    return value;
  }

  try {
    return JSON.parse(value.slice(firstBrace, lastBrace + 1));
  } catch {
    return value;
  }
};

const getStringValue = (
  source: Record<string, unknown> | null,
  keys: string[]
): string | null => {
  if (!source) {
    return null;
  }

  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return null;
};

const extractFirstMessage = (value: unknown): string | null => {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const message = extractFirstMessage(item);

      if (message) {
        return message;
      }
    }
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value as Record<string, unknown>)) {
      const message = extractFirstMessage(item);

      if (message) {
        return message;
      }
    }
  }

  return null;
};

const getBackendPayloadError = (
  source: Record<string, unknown> | null
): string | null => {
  if (!source) {
    return null;
  }

  const error = getStringValue(source, ["error"]);
  const message = extractFirstMessage(source.message);
  const validationError = extractFirstMessage(source.errors);

  return validationError || (error ? message || error : null);
};

const getUserValue = (source: Record<string, unknown> | null) => {
  const user = toRecord(source?.user);
  const data = toRecord(source?.data);

  return user || toRecord(data?.user) || data;
};

const normalizeDashboardAuthResponse = (payload: unknown): DashboardAuthResponse => {
  const parsedPayload = parseJsonFromMixedResponse(payload);
  const root = toRecord(parsedPayload);
  const data = toRecord(root?.data);
  const auth = toRecord(root?.auth) || toRecord(root?.authorization) || toRecord(root?.authorisation);
  const dataAuth =
    toRecord(data?.auth) || toRecord(data?.authorization) || toRecord(data?.authorisation);

  const token =
    getStringValue(root, ["token", "access_token", "accessToken"]) ||
    getStringValue(data, ["token", "access_token", "accessToken"]) ||
    getStringValue(auth, ["token", "access_token", "accessToken"]) ||
    getStringValue(dataAuth, ["token", "access_token", "accessToken"]);

  const user = getUserValue(root) || getUserValue(data);
  const message =
    getStringValue(root, ["message"]) ||
    getStringValue(data, ["message"]) ||
    "Login successful";
  const backendError = getBackendPayloadError(root) || getBackendPayloadError(data);

  if (!token || !user?.email || !user?.role) {
    if (backendError) {
      throw new Error(backendError);
    }

    throw new Error("Login response did not include token or user data.");
  }

  return {
    message,
    token,
    user: user as unknown as DashboardLoggedInUser,
  };
};

export const loginDashboardAPICall = async (
  payload: DashboardLoginDTO
): Promise<DashboardAuthResponse> => {
  const response = await dashboardApi.post<unknown>("/userManager/login", {
    email: payload.usernameOrEmail,
    password: payload.password,
  });

  return normalizeDashboardAuthResponse(response.data);
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
