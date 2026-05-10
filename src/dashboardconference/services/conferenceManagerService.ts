import { conferenceApi } from "../lib/axios";
import type {
  ActiveConferenceResponse,
  AssistedMemberLoginDTO,
  AdminLoginDTO,
  AttendanceRecord,
  BulkAssistedRegistrationResponse,
  BulkAssistedRegistrationRow,
  ConferenceActivityResponse,
  ConferenceEventListItem,
  ConferenceEventResponse,
  ConferenceSummaryResponse,
  ConferenceUser,
  CreateAdminDTO,
  CreateAdminResponse,
  CreateConferenceActivityDTO,
  CreateConferenceEventDTO,
  DashboardResponse,
  ForgotConferencePasswordDTO,
  LoginResponse,
  MarkAttendanceDTO,
  MemberLoginDTO,
  RegisterConferenceDTO,
  RegisterConferenceResponse,
  ResetConferencePasswordDTO,
  ConferenceActionResponse,
} from "../types/conferenceManager";

const toRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : null;

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

export const getConferenceApiErrorMessage = (
  error: unknown,
  fallback = "Action failed. Please try again."
): string => {
  if ("isAxiosError" in Object(error) && error && typeof error === "object") {
    const axiosError = error as { message?: string; response?: { data?: unknown } };

    if (!axiosError.response) {
      return axiosError.message || fallback;
    }

    const responseData = parseJsonFromMixedResponse(
      axiosError.response.data
    );
    const data = toRecord(responseData);
    const validationMessage =
      extractFirstMessage(data?.message) || extractFirstMessage(data?.errors);
    const apiError = getStringValue(data, ["error"]);

    return validationMessage || apiError || fallback;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

const normalizeConferenceUser = (value: Record<string, unknown>): ConferenceUser => {
  const role = String(value.role ?? "").trim().toLowerCase();

  if (role !== "member" && role !== "admin") {
    throw new Error("Login response returned an unknown conference role.");
  }

  return {
    id: Number(value.id ?? 0),
    first_name: String(value.first_name ?? value.firstName ?? ""),
    full_name: String(value.full_name ?? value.fullName ?? value.name ?? ""),
    email: typeof value.email === "string" ? value.email : null,
    phone_number: typeof value.phone_number === "string" ? value.phone_number : null,
    role,
  };
};

const normalizeLoginResponse = (payload: unknown): LoginResponse => {
  const parsedPayload = parseJsonFromMixedResponse(payload);
  const root = toRecord(parsedPayload);
  const data = toRecord(root?.data);
  const auth = toRecord(root?.auth) || toRecord(root?.authorization) || toRecord(root?.authorisation);
  const dataAuth =
    toRecord(data?.auth) || toRecord(data?.authorization) || toRecord(data?.authorisation);

  const backendError =
    extractFirstMessage(root?.errors) ||
    (root?.error ? extractFirstMessage(root.message) || getStringValue(root, ["error"]) : null) ||
    extractFirstMessage(data?.errors) ||
    (data?.error ? extractFirstMessage(data.message) || getStringValue(data, ["error"]) : null);

  const token =
    getStringValue(root, ["token", "access_token", "accessToken"]) ||
    getStringValue(data, ["token", "access_token", "accessToken"]) ||
    getStringValue(auth, ["token", "access_token", "accessToken"]) ||
    getStringValue(dataAuth, ["token", "access_token", "accessToken"]);
  const user = toRecord(root?.user) || toRecord(data?.user);
  const message =
    getStringValue(root, ["message"]) ||
    getStringValue(data, ["message"]) ||
    "Login successful.";

  if (!token || !user) {
    throw new Error(backendError || "Login response did not include token or user data.");
  }

  return {
    message,
    token,
    user: normalizeConferenceUser(user),
    current_registration: root?.current_registration as LoginResponse["current_registration"],
  };
};

export const getActiveConferenceAPICall = async (): Promise<ActiveConferenceResponse> => {
  const response = await conferenceApi.get<ActiveConferenceResponse>("/events/active");
  return response.data;
};

export const registerConferenceAPICall = async (
  payload: RegisterConferenceDTO
): Promise<RegisterConferenceResponse> => {
  const response = await conferenceApi.post<RegisterConferenceResponse>("/auth/register", payload);
  return response.data;
};

export const memberLoginAPICall = async (
  payload: MemberLoginDTO
): Promise<LoginResponse> => {
  const response = await conferenceApi.post<unknown>("/auth/member-login", {
    first_name: payload.first_name.trim(),
    registration_code: payload.registration_code.trim(),
    password: payload.password,
  });

  return normalizeLoginResponse(response.data);
};

export const assistedMemberLoginAPICall = async (
  payload: AssistedMemberLoginDTO
): Promise<LoginResponse> => {
  const response = await conferenceApi.post<unknown>("/auth/assisted-login", {
    first_name: payload.first_name.trim(),
    passcode: payload.passcode.trim(),
  });

  return normalizeLoginResponse(response.data);
};

export const adminLoginAPICall = async (
  payload: AdminLoginDTO
): Promise<LoginResponse> => {
  const response = await conferenceApi.post<unknown>("/auth/admin-login", payload);
  return normalizeLoginResponse(response.data);
};

export const getDashboardAPICall = async (): Promise<DashboardResponse> => {
  const response = await conferenceApi.get<DashboardResponse>("/dashboard");
  return response.data;
};

export const markAttendanceAPICall = async (
  payload: MarkAttendanceDTO
): Promise<ConferenceActionResponse> => {
  const response = await conferenceApi.post<ConferenceActionResponse>("/attendance/mark", payload);
  return response.data;
};

export const getMyAttendanceAPICall = async (): Promise<AttendanceRecord[]> => {
  const response = await conferenceApi.get<AttendanceRecord[]>("/attendance/my");
  return response.data;
};

export const getPendingAttendanceAPICall = async (): Promise<AttendanceRecord[]> => {
  const response = await conferenceApi.get<AttendanceRecord[]>("/admin/attendance/pending");
  return response.data;
};

export const approveAttendanceAPICall = async (
  id: number
): Promise<ConferenceActionResponse> => {
  const response = await conferenceApi.post<ConferenceActionResponse>(`/admin/attendance/${id}/approve`);
  return response.data;
};

export const rejectAttendanceAPICall = async (
  id: number,
  comments?: string
): Promise<ConferenceActionResponse> => {
  const response = await conferenceApi.post<ConferenceActionResponse>(
    `/admin/attendance/${id}/reject`,
    { comments }
  );
  return response.data;
};

export const logoutConferenceAPICall = async (): Promise<ConferenceActionResponse> => {
  const response = await conferenceApi.post<ConferenceActionResponse>("/auth/logout");
  return response.data;
};

export const createAdminAPICall = async (
  payload: CreateAdminDTO
): Promise<CreateAdminResponse> => {
  const response = await conferenceApi.post<CreateAdminResponse>(
    "/admin/users/create-admin",
    payload
  );
  return response.data;
};

export const getConferenceMembersAPICall = async (): Promise<ConferenceUser[]> => {
  const response = await conferenceApi.get<ConferenceUser[]>("/admin/users/members");
  return response.data;
};

export const promoteConferenceMemberAPICall = async (
  id: number
): Promise<ConferenceActionResponse> => {
  const response = await conferenceApi.post<ConferenceActionResponse>(`/admin/users/${id}/promote`);
  return response.data;
};

export const createConferenceEventAPICall = async (
  payload: CreateConferenceEventDTO
): Promise<ConferenceEventResponse> => {
  const response = await conferenceApi.post<ConferenceEventResponse>("/admin/events", payload);
  return response.data;
};

export const getConferenceEventsAPICall = async (): Promise<ConferenceEventListItem[]> => {
  const response = await conferenceApi.get<ConferenceEventListItem[]>("/admin/events");
  return response.data;
};

export const deleteConferenceEventAPICall = async (
  id: number | string
): Promise<ConferenceActionResponse> => {
  const response = await conferenceApi.delete<ConferenceActionResponse>(`/admin/events/${id}`);
  return response.data;
};

const buildConferenceActivityFormData = (payload: CreateConferenceActivityDTO) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "document" && value instanceof Blob) {
        formData.append(
          key,
          value,
          value instanceof File ? value.name : "conference-activity-document"
        );
      } else {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
};

export const createConferenceActivityAPICall = async (
  conferenceEventId: number,
  payload: CreateConferenceActivityDTO
): Promise<ConferenceActivityResponse> => {
  const response = await conferenceApi.post<ConferenceActivityResponse>(
    `/admin/events/${conferenceEventId}/activities`,
    buildConferenceActivityFormData(payload),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getRegistrationRecordsAPICall = async () => {
  const response = await conferenceApi.get("/admin/registrations");
  return response.data;
};

export const bulkAssistedRegistrationAPICall = async (
  rows: BulkAssistedRegistrationRow[]
): Promise<BulkAssistedRegistrationResponse> => {
  const response = await conferenceApi.post<BulkAssistedRegistrationResponse>(
    "/admin/registrations/bulk-assisted",
    { rows }
  );
  return response.data;
};

export const getAttendanceRecordsAPICall = async (): Promise<AttendanceRecord[]> => {
  const response = await conferenceApi.get<AttendanceRecord[]>("/admin/attendance/all");
  return response.data;
};

export const getAdminSummaryAPICall = async (): Promise<ConferenceSummaryResponse> => {
  const response = await conferenceApi.get<ConferenceSummaryResponse>("/admin/summary");
  return response.data;
};

export const forgotConferencePasswordAPICall = async (
  payload: ForgotConferencePasswordDTO
): Promise<ConferenceActionResponse> => {
  const response = await conferenceApi.post<ConferenceActionResponse>("/auth/forgot-password", payload);
  return response.data;
};

export const resetConferencePasswordAPICall = async (
  payload: ResetConferencePasswordDTO
): Promise<ConferenceActionResponse> => {
  const response = await conferenceApi.post<ConferenceActionResponse>("/auth/reset-password", payload);
  return response.data;
};
