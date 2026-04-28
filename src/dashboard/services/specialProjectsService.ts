import { dashboardApi } from "../lib/axios";
import type {
  PublicSpecialProject,
  PublicSpecialProjectsListResponse,
  SpecialProjectsListResponse,
  SpecialProjectsReportDTO,
  SpecialProjectsReportResponse,
} from "../types/specialProjects";

const ADMIN_BASE_PATH = "/specialProjects";
const PUBLIC_BASE_PATH = "/public/special-projects";

const buildSpecialProjectFormData = (payload: Partial<SpecialProjectsReportDTO>) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });

  return formData;
};

const normalizeAdminList = (
  payload: SpecialProjectsListResponse
): SpecialProjectsReportDTO[] => {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
};

const normalizePublicList = (
  payload: PublicSpecialProjectsListResponse
): PublicSpecialProject[] => {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
};

export const createSpecialProjectAPICall = async (
  payload: SpecialProjectsReportDTO
): Promise<SpecialProjectsReportResponse> => {
  const formData = buildSpecialProjectFormData(payload);

  const response = await dashboardApi.post<SpecialProjectsReportResponse>(
    `${ADMIN_BASE_PATH}/createReport`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getSpecialProjectAPICall = async (
  id: string
): Promise<SpecialProjectsReportDTO> => {
  const response = await dashboardApi.get<
    SpecialProjectsReportDTO | { data: SpecialProjectsReportDTO }
  >(`${ADMIN_BASE_PATH}/getReport/${id}`);

  const payload = response.data;
  return "data" in payload ? payload.data : payload;
};

export const getAllSpecialProjectsAPICall = async (): Promise<SpecialProjectsReportDTO[]> => {
  const response = await dashboardApi.get<SpecialProjectsListResponse>(
    `${ADMIN_BASE_PATH}/getAllProjects`
  );

  return normalizeAdminList(response.data);
};

export const updateSpecialProjectAPICall = async (
  id: string,
  payload: Partial<SpecialProjectsReportDTO>
): Promise<SpecialProjectsReportResponse> => {
  const formData = buildSpecialProjectFormData(payload);

  const response = await dashboardApi.post<SpecialProjectsReportResponse>(
    `${ADMIN_BASE_PATH}/updateReport/${id}?_method=PUT`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteSpecialProjectAPICall = async (
  id: string
): Promise<SpecialProjectsReportResponse> => {
  const response = await dashboardApi.delete<SpecialProjectsReportResponse>(
    `${ADMIN_BASE_PATH}/deleteReport/${id}`
  );

  return response.data;
};

export const getPublicSpecialProjectsAPICall = async (): Promise<PublicSpecialProject[]> => {
  const response = await dashboardApi.get<PublicSpecialProjectsListResponse>(PUBLIC_BASE_PATH);
  return normalizePublicList(response.data);
};

export const getPublicSpecialProjectAPICall = async (
  slug: string
): Promise<PublicSpecialProject> => {
  const response = await dashboardApi.get<
    PublicSpecialProject | { data: PublicSpecialProject }
  >(`${PUBLIC_BASE_PATH}/${slug}`);

  const payload = response.data;
  return "data" in payload ? payload.data : payload;
};