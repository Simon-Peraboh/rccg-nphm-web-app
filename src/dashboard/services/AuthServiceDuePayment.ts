import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/monthlyDuesReport';


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

export interface MonthlyDuePaymentDTO {
    id?: string;
    amount: string;
    province: string;
    paymentDate: string;
    provinceCoordinator: string;
    refMonth: string;
    whoPaid?: string;  // Optional
    createdDate: string;
    remark?: string;   // Optional
}

export interface MonthlyDuePaymentResponse {
    message: string;
    duePaymentDTO?: MonthlyDuePaymentDTO;
}

export const createReport = async (report: MonthlyDuePaymentDTO) => {
    return axios.post<MonthlyDuePaymentResponse>(`${BASE_URL}`, report);
};

export const getReports = async () => {
    return axios.get<MonthlyDuePaymentDTO[]>(`${BASE_URL}`);
};

export const getReportById = async (id: string) => {
    return axios.get<MonthlyDuePaymentDTO>(`${BASE_URL}/${id}`);
};

export const updateReport = (id: string, report: MonthlyDuePaymentDTO) => {
    return axios.put<MonthlyDuePaymentResponse>(`${BASE_URL}/${id}`, report);
};

export const deleteReport = async (id: string) => {
    return axios.delete<MonthlyDuePaymentResponse>(`${BASE_URL}/${id}`);
};
