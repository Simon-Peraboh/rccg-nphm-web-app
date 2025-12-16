import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://app2.rccgphm.org/api/quarterlyReport';

// Interceptor to add Authorization header
// axios.interceptors.request.use(
//     config => {
//         const token = getToken();
//         if (token) {
//             config.headers['Authorization'] = token;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );


// Auth-only instance
const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export interface QuarterlyReportDTO {
    id?: string;
    whichYear: string;
    period: string;
    totalSouls: string;
    totalAmount: string;
  }


export interface QuarterlyReportResponse {
    message: string;
    quarterlyReportDTO?: QuarterlyReportDTO;
}

export const createReport = async (report: QuarterlyReportDTO) => {
    return axios.post<QuarterlyReportResponse>(`${BASE_URL}/createReport`, report);
};

export const getReport = async (id: string) => {
    return axios.get<QuarterlyReportDTO>(`${BASE_URL}/getReport/${id}`);
};

export const getAllReport = async () => {
    return axios.get<QuarterlyReportDTO[]>(`${BASE_URL}/getAllReport`);
};

export const updateReport = (id: string, report: Partial< QuarterlyReportDTO>) => {
    return axios.put<QuarterlyReportResponse>(`${BASE_URL}/updateReport/${id}`, report);
};

export const deleteReport = async (id: string) => {
    return axios.delete<QuarterlyReportResponse>(`${BASE_URL}/deleteReport/${id}`);
};
