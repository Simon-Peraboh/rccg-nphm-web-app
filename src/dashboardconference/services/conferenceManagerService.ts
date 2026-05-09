import { conferenceApi } from "../lib/axios";
import type {
  ActiveConferenceResponse,
  AdminLoginDTO,
  AttendanceRecord,
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
  const response = await conferenceApi.post<LoginResponse>("/auth/member-login", {
    first_name: payload.first_name.trim(),
    registration_code: payload.registration_code.trim(),
    password: payload.password,
  });

  return response.data;
};

export const adminLoginAPICall = async (
  payload: AdminLoginDTO
): Promise<LoginResponse> => {
  const response = await conferenceApi.post<LoginResponse>("/auth/admin-login", payload);
  return response.data;
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

<<<<<<< HEAD
=======
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

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
export const createConferenceActivityAPICall = async (
  conferenceEventId: number,
  payload: CreateConferenceActivityDTO
): Promise<ConferenceActivityResponse> => {
  const response = await conferenceApi.post<ConferenceActivityResponse>(
    `/admin/events/${conferenceEventId}/activities`,
<<<<<<< HEAD
    payload
=======
    buildConferenceActivityFormData(payload),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  );
  return response.data;
};

export const getRegistrationRecordsAPICall = async () => {
  const response = await conferenceApi.get("/admin/registrations");
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
<<<<<<< HEAD
};
=======
};
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
