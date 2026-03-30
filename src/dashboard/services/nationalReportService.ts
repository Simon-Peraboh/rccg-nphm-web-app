import { dashboardApi } from "../lib/axios";
import type {
  NationalReportDTO,
  NationalReportListResponse,
  NationalReportResponse,
} from "../types/nationalReport";

const BASE_PATH = "/nationalReport";

export const createNationalReportAPICall = async (
  payload: NationalReportDTO
): Promise<NationalReportResponse> => {
  const response = await dashboardApi.post<NationalReportResponse>(
    `${BASE_PATH}/createReport`,
    payload
  );
  return response.data;
};

export const getAllNationalReportsAPICall = async (): Promise<NationalReportListResponse> => {
  const response = await dashboardApi.get<NationalReportListResponse>(
    `${BASE_PATH}/getAllReport`
  );
  return response.data;
};

export const getNationalReportAPICall = async (
  id: string
): Promise<NationalReportDTO> => {
  const response = await dashboardApi.get<NationalReportDTO>(
    `${BASE_PATH}/getReport/${id}`
  );
  return response.data;
};

export const updateNationalReportAPICall = async (
  id: string,
  payload: Partial<NationalReportDTO>
): Promise<NationalReportResponse> => {
  const response = await dashboardApi.put<NationalReportResponse>(
    `${BASE_PATH}/updateReport/${id}`,
    payload
  );
  return response.data;
};

export const deleteNationalReportAPICall = async (
  id: string
): Promise<NationalReportResponse> => {
  const response = await dashboardApi.delete<NationalReportResponse>(
    `${BASE_PATH}/deleteReport/${id}`
  );
  return response.data;
};