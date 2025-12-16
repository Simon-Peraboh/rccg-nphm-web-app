import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://app2.rccgphm.org/api/nationalReport';


const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
   config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export interface NationalReportDTO {
    core_duties: string;
    monthly_task: string;
    task_done: string;
    strength?: string;
    weakness?: string;
    opportunities?: string;
    threats?: string;
    amount_budgeted: string;
    amount_spent: string;
    remarks?: string;
  }
  

export interface NationalReportResponse {
    message: string;
    nationalReportDTO?: NationalReportDTO;
}

export const createReport = async (report: NationalReportDTO) => {
  return authAxios.post<NationalReportResponse>(`${BASE_URL}/createReport`, report);
};

export const getAllReport = async () => {
  return axios.get<NationalReportDTO[]>(`${BASE_URL}/getAllReport`);
};

export const getReport = async (id: string) => {
  return axios.get<NationalReportDTO>(`${BASE_URL}/getReport/${id}`); // ✅ add slash
};

export const updateReport = (id: string, report: Partial<NationalReportDTO>) => {
  return axios.put<NationalReportResponse>(`${BASE_URL}/updateReport/${id}`, report); // ✅ add slash
};

export const deleteReport = async (id: string) => {
  return axios.delete<NationalReportResponse>(`${BASE_URL}/deleteReport/${id}`); // ✅ add slash
};
