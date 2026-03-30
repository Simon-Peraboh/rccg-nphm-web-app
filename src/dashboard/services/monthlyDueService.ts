import { dashboardApi } from "../lib/axios";
import type {
  MonthlyDueListResponse,
  MonthlyDuePaymentDTO,
  MonthlyDuePaymentResponse,
} from "../types/monthlyDue";

const BASE_PATH = "/monthlyDues";

export const createMonthlyDueReportAPICall = async (
  payload: MonthlyDuePaymentDTO
): Promise<MonthlyDuePaymentResponse> => {
  const response = await dashboardApi.post<MonthlyDuePaymentResponse>(
    `${BASE_PATH}/createReport`,
    payload
  );
  return response.data;
};

export const getAllMonthlyDueReportsAPICall = async (): Promise<MonthlyDueListResponse> => {
  const response = await dashboardApi.get<MonthlyDueListResponse>(
    `${BASE_PATH}/getAllReport`
  );
  return response.data;
};

export const getMonthlyDueReportAPICall = async (
  id: string
): Promise<MonthlyDuePaymentDTO> => {
  const response = await dashboardApi.get<MonthlyDuePaymentDTO>(
    `${BASE_PATH}/getReport/${id}`
  );
  return response.data;
};

export const updateMonthlyDueReportAPICall = async (
  id: string,
  payload: Partial<MonthlyDuePaymentDTO>
): Promise<MonthlyDuePaymentResponse> => {
  const response = await dashboardApi.put<MonthlyDuePaymentResponse>(
    `${BASE_PATH}/updateReport/${id}`,
    payload
  );
  return response.data;
};

export const deleteMonthlyDueReportAPICall = async (
  id: string
): Promise<MonthlyDuePaymentResponse> => {
  const response = await dashboardApi.delete<MonthlyDuePaymentResponse>(
    `${BASE_PATH}/deleteReport/${id}`
  );
  return response.data;
};