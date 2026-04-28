import { dashboardApi } from "../lib/axios";
import type {
  MinistryActivityDTO,
  MinistryActivityFormValues,
  MinistryActivityResponse,
  MinistryActivitiesListResponse,
  PublicMinistryActivity,
  PublicMinistryActivitiesListResponse,
} from "../types/ministryActivities";

const BASE_PATH = "/ministryActivities";
const PUBLIC_BASE_PATH = "/public/ministry-activities";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

const buildFormData = (payload: Partial<MinistryActivityFormValues>) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "activityDate") {
        formData.append("activity_date", String(value));
      } else if (key === "isPublished") {
        formData.append("is_published", value ? "1" : "0");
      } else {
        formData.append(key, value as string | Blob);
      }
    }
  });

  return formData;
};

const normalizeImageUrl = (imagePath?: string | File | null): string | null => {
  if (!imagePath || typeof imagePath !== "string") return null;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  let normalizedPath = imagePath.trim();
  normalizedPath = normalizedPath.replace(/^\/+/, "");
  normalizedPath = normalizedPath.replace(/^public\//, "");
  normalizedPath = normalizedPath.replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${normalizedPath}`;
};

const normalizeActivity = (
  data: Partial<MinistryActivityDTO> & {
    activity_date?: string | null;
    image_url?: string | null;
    is_published?: boolean | number | string | null;
  }
): MinistryActivityDTO => ({
  id: String(data.id ?? ""),
  title: String(data.title ?? ""),
  caption: data.caption ? String(data.caption) : "",
  activityDate: data.activityDate
    ? String(data.activityDate)
    : data.activity_date
    ? String(data.activity_date)
    : "",
  location: data.location ? String(data.location) : "",
  image: data.image ? data.image : "",
  imageUrl: data.imageUrl
    ? String(data.imageUrl)
    : data.image_url
    ? String(data.image_url)
    : data.image
    ? normalizeImageUrl(data.image)
    : "",
  isPublished:
    typeof data.isPublished === "boolean"
      ? data.isPublished
      : typeof data.is_published === "boolean"
      ? data.is_published
      : Boolean(data.is_published),
});

export const getAllMinistryActivitiesAPICall = async (): Promise<MinistryActivityDTO[]> => {
  const response = await dashboardApi.get<MinistryActivitiesListResponse>(`${BASE_PATH}/getAll`);
  const payload = response.data;

  const rawList = Array.isArray(payload)
    ? payload
    : payload && Array.isArray(payload.data)
    ? payload.data
    : [];

  return rawList.map((item) => normalizeActivity(item));
};

export const getPublicMinistryActivitiesAPICall = async (): Promise<PublicMinistryActivity[]> => {
  const response = await dashboardApi.get<PublicMinistryActivitiesListResponse>(PUBLIC_BASE_PATH);
  const payload = response.data;

  const rawList = Array.isArray(payload)
    ? payload
    : payload && Array.isArray(payload.data)
    ? payload.data
    : [];

  return rawList.map((item) => normalizeActivity(item));
};

export const getMinistryActivityAPICall = async (
  id: string
): Promise<MinistryActivityDTO> => {
  const response = await dashboardApi.get<MinistryActivityDTO | { data: MinistryActivityDTO }>(
    `${BASE_PATH}/get/${id}`
  );

  const payload = response.data;
  const raw = "data" in payload ? payload.data : payload;

  return normalizeActivity(raw);
};

export const createMinistryActivityAPICall = async (
  payload: MinistryActivityFormValues
): Promise<MinistryActivityResponse> => {
  const response = await dashboardApi.post<MinistryActivityResponse>(
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

export const updateMinistryActivityAPICall = async (
  id: string,
  payload: Partial<MinistryActivityFormValues>
): Promise<MinistryActivityResponse> => {
  const response = await dashboardApi.post<MinistryActivityResponse>(
    `${BASE_PATH}/update/${id}?_method=PUT`,
    buildFormData(payload),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteMinistryActivityAPICall = async (
  id: string
): Promise<{ message: string }> => {
  const response = await dashboardApi.delete<{ message: string }>(`${BASE_PATH}/delete/${id}`);
  return response.data;
};

export const toggleMinistryActivityPublishAPICall = async (
  id: string,
  isPublished: boolean
): Promise<MinistryActivityResponse> => {
  const response = await dashboardApi.patch<MinistryActivityResponse>(
    `${BASE_PATH}/toggle-publish/${id}`,
    { is_published: !isPublished }
  );

  return response.data;
};