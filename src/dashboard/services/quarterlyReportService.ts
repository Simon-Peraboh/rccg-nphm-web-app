import axios from "axios";
import { dashboardApi } from "../lib/axios";
import type {
  QuarterlyReportDTO,
  QuarterlyReportListResponse,
  QuarterlyReportResponse,
} from "../types/quarterlyReport";

const BASE_PATH = "/quarterlyReport";
const PUBLIC_BASE_PATH = "/public/quarterly-reports";

export const createQuarterlyReportAPICall = async (
  payload: QuarterlyReportDTO
): Promise<QuarterlyReportResponse> => {
  const response = await dashboardApi.post<QuarterlyReportResponse>(
    `${BASE_PATH}/createReport`,
    payload
  );
  return response.data;
};

export const getQuarterlyReportAPICall = async (
  id: string
): Promise<QuarterlyReportDTO> => {
  const response = await dashboardApi.get<QuarterlyReportDTO>(
    `${BASE_PATH}/getReport/${id}`
  );
  return response.data;
};

export const getAllQuarterlyReportsAPICall = async (): Promise<QuarterlyReportDTO[]> => {
  const response = await dashboardApi
    .get<QuarterlyReportListResponse>(PUBLIC_BASE_PATH)
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return dashboardApi.get<QuarterlyReportListResponse>(`${BASE_PATH}/getAllReport`);
      }

      throw error;
    });
  const payload = response.data;

  return Array.isArray(payload) ? payload : payload.data ?? [];
};

export const updateQuarterlyReportAPICall = async (
  id: string,
  payload: Partial<QuarterlyReportDTO>
): Promise<QuarterlyReportResponse> => {
  const response = await dashboardApi.put<QuarterlyReportResponse>(
    `${BASE_PATH}/updateReport/${id}`,
    payload
  );
  return response.data;
};

export const deleteQuarterlyReportAPICall = async (
  id: string
): Promise<QuarterlyReportResponse> => {
  const response = await dashboardApi.delete<QuarterlyReportResponse>(
    `${BASE_PATH}/deleteReport/${id}`
  );
  return response.data;
};
