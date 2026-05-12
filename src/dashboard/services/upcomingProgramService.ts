import { dashboardApi } from "../lib/axios";
import type {
  UpcomingProgramDTO,
  UpcomingProgramFormValues,
  UpcomingProgramResponse,
} from "../types/upcomingProgram";

const BASE_PATH = "/upcomingPrograms";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

type RawUpcomingProgram = Partial<UpcomingProgramDTO> & {
  event_date?: string | null;
  date?: string | null;
  event_time?: string | null;
  time?: string | null;
  image_url?: string | null;
  alert_message?: string | null;
  is_published?: boolean | number | string | null;
};

type RawListResponse = RawUpcomingProgram[] | { data?: RawUpcomingProgram[] };

const normalizeFileUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  const path = value
    .trim()
    .replace(/^\/+/, "")
    .replace(/^public\//, "")
    .replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${path}`;
};

const normalizeProgram = (program: RawUpcomingProgram): UpcomingProgramDTO => ({
  id: String(program.id ?? ""),
  title: String(program.title ?? ""),
  eventDate: program.eventDate ?? program.event_date ?? program.date ?? "",
  eventTime: program.eventTime ?? program.event_time ?? program.time ?? "",
  location: program.location ?? "",
  image: program.image ?? "",
  imageUrl: normalizeFileUrl(program.imageUrl ?? program.image_url ?? program.image ?? ""),
  alertMessage: program.alertMessage ?? program.alert_message ?? "",
  isPublished:
    typeof program.isPublished === "boolean"
      ? program.isPublished
      : typeof program.is_published === "boolean"
      ? program.is_published
      : program.is_published === undefined
      ? true
      : Boolean(Number(program.is_published)),
});

const buildFormData = (payload: UpcomingProgramFormValues) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("event_date", payload.eventDate);
  formData.append("event_time", payload.eventTime);
  formData.append("location", payload.location);
  formData.append("alert_message", payload.alertMessage);
  formData.append("is_published", payload.isPublished ? "1" : "0");

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
};

export const getAllUpcomingProgramsAPICall = async (): Promise<UpcomingProgramDTO[]> => {
  const response = await dashboardApi.get<RawListResponse>(`${BASE_PATH}/getAll`);
  const payload = response.data;
  const rawList = Array.isArray(payload) ? payload : payload.data ?? [];

  return rawList.map(normalizeProgram);
};

export const createUpcomingProgramAPICall = async (
  payload: UpcomingProgramFormValues
): Promise<UpcomingProgramResponse> => {
  const response = await dashboardApi.post<UpcomingProgramResponse>(
    `${BASE_PATH}/create`,
    buildFormData(payload),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteUpcomingProgramAPICall = async (
  id: string
): Promise<{ message: string }> => {
  const response = await dashboardApi.delete<{ message: string }>(
    `${BASE_PATH}/delete/${id}`
  );
  return response.data;
};

export const toggleUpcomingProgramPublishAPICall = async (
  id: string,
  isPublished: boolean
): Promise<UpcomingProgramResponse> => {
  const response = await dashboardApi.patch<UpcomingProgramResponse>(
    `${BASE_PATH}/toggle-publish/${id}`,
    { is_published: !isPublished }
  );

  return response.data;
};

