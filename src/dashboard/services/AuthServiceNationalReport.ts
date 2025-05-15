import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/nationalReport';

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

export interface NationalReportDTO {
    coreDuties: string;
    monthlyTask: string;
    taskDone: string;
    strength?: string;
    weakness?: string;
    opportunities?: string;
    threats?: string;
    amountBudgeted: string;
    amountSpent: string;
    createdDate: string;
    remarks?: string;
  }
  

export interface NationalReportResponse {
    message: string;
    nationalReportDTO?: NationalReportDTO;
}

export const createReport = async (report: NationalReportDTO) => {
    return axios.post<NationalReportResponse>(`${BASE_URL}`, report);
};

export const getReports = async () => {
    return axios.get<NationalReportDTO[]>(`${BASE_URL}`);
};

export const getReportById = async (id: string) => {
    return axios.get<NationalReportDTO>(`${BASE_URL}/${id}`);
};

export const updateReport = (id: string, report: NationalReportDTO) => {
    return axios.put<NationalReportResponse>(`${BASE_URL}/${id}`, report);
};

export const deleteReport = async (id: string) => {
    return axios.delete<NationalReportResponse>(`${BASE_URL}/${id}`);
};
