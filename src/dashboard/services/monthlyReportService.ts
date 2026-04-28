import { dashboardApi } from "../lib/axios";
import type {
  MonthlyReportDTO,
  MonthlyReportListResponse,
  MonthlyReportResponse,
  ProvinceListResponse,
  RegionListResponse,
} from "../types/monthlyReport";

const BASE_PATH = "/monthlyReports";
const USER_PROFILE_BASE_PATH = "/userProfile";
const NATIONAL_REPORT_BASE_PATH = "/monthlyReports";

export const createMonthlyReportAPICall = async (
  payload: MonthlyReportDTO
): Promise<MonthlyReportResponse> => {
  const response = await dashboardApi.post<MonthlyReportResponse>(
    `${BASE_PATH}/createReport`,
    payload
  );
  return response.data;
};

export const getAllMonthlyReportsAPICall = async (): Promise<MonthlyReportListResponse> => {
  const response = await dashboardApi.get<MonthlyReportListResponse>(
    `${BASE_PATH}/getAllReports`
  );
  return response.data;
};

export const getMonthlyReportAPICall = async (
  id: string
): Promise<MonthlyReportDTO> => {
  const response = await dashboardApi.get<MonthlyReportDTO>(
    `${BASE_PATH}/getReport/${id}`
  );
  return response.data;
};

export const updateMonthlyReportAPICall = async (
  id: string,
  payload: Partial<MonthlyReportDTO>
): Promise<MonthlyReportResponse> => {
  const response = await dashboardApi.put<MonthlyReportResponse>(
    `${BASE_PATH}/updateReport/${id}`,
    payload
  );
  return response.data;
};

export const deleteMonthlyReportAPICall = async (
  id: string
): Promise<MonthlyReportResponse> => {
  const response = await dashboardApi.delete<MonthlyReportResponse>(
    `${BASE_PATH}/deleteReport/${id}`
  );
  return response.data;
};

export const getMonthlyReportRegionsAPICall = async (): Promise<string[]> => {
  const response = await dashboardApi.get<RegionListResponse | string[]>(
    `${BASE_PATH}/regions`
  );

  return Array.isArray(response.data) ? response.data : response.data.regions;
};

export const getMonthlyReportProvincesAPICall = async (
  region: string
): Promise<string[]> => {
  const response = await dashboardApi.get<ProvinceListResponse | string[]>(
    `${BASE_PATH}/provinces/${region}`
  );

  return Array.isArray(response.data) ? response.data : response.data.provinces;
};

export const fetchTotalMembersAPICall = async (): Promise<number> => {
  const response = await dashboardApi.get(`${USER_PROFILE_BASE_PATH}/getAllUsers`);
  return Array.isArray(response.data) ? response.data.length : 0;
};

export const fetchNationalMonthlyReportAPICall = async (): Promise<MonthlyReportDTO[]> => {
  const response = await dashboardApi.get<MonthlyReportDTO[]>(
    `${NATIONAL_REPORT_BASE_PATH}/getAllReports`
  );
  return response.data;
};

export const fetchTotalExpenditureAPICall = async (): Promise<number> => {
  const reports = await fetchNationalMonthlyReportAPICall();

  return reports.reduce((acc, report) => {
    const cleanValue = String(report.amount_spent || "0")
      .replace(/[^0-9.]/g, "")
      .trim();

    const parsed = parseFloat(cleanValue);
    return acc + (isNaN(parsed) ? 0 : parsed);
  }, 0);
};