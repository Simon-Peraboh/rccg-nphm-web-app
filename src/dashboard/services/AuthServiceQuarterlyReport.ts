import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/quarterlyReport';

// Interceptor to add Authorization header
axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export interface QuarterlyReportDTO {
    id?: string;
    whichYear: string;
    period: string;
    totalSouls: string;
    totalAmount: string;
    creationDate: string;
  }
  

export interface QuarterlyReportResponse {
    message: string;
    quarterlyReportDTO?: QuarterlyReportDTO;
}

export const createReport = async (report: QuarterlyReportDTO) => {
    return axios.post<QuarterlyReportResponse>(`${BASE_URL}`, report);
};

export const getProjectById = async (id: string) => {
    return axios.get<QuarterlyReportDTO>(`${BASE_URL}/${id}`);
};

export const getReports = async () => {
    return axios.get<QuarterlyReportDTO[]>(`${BASE_URL}`);
};

export const updateReport = (id: string, report: QuarterlyReportDTO) => {
    return axios.put<QuarterlyReportResponse>(`${BASE_URL}/${id}`, report);
};

export const deleteReport = async (id: string) => {
    return axios.delete<QuarterlyReportResponse>(`${BASE_URL}/${id}`);
};
