import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'http://127.0.0.1:8000/api/monthlyDues';


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
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
export interface MonthlyDuePaymentDTO {
    id?: string;
    amount: string;
    province: string;
    paymentDate: string;
    provinceCoordinator: string;
    refMonth: string;
    whoPaid?: string;  // Optional
    remark?: string;   // Optional
}

export interface MonthlyDuePaymentResponse {
    message: string;
    duePaymentDTO?: MonthlyDuePaymentDTO;
}

export const createReport = async (report: MonthlyDuePaymentDTO) => {
    return axios.post<MonthlyDuePaymentResponse>(`${BASE_URL}/createReport`, report);
};

export const getAllReport = async () => {
    return axios.get<MonthlyDuePaymentDTO[]>(`${BASE_URL}/getAllReport`);
};

export const getReport = async (id: string) => {
    return axios.get<MonthlyDuePaymentDTO>(`${BASE_URL}/getReport/${id}`);
};

export const updateReport = (id: string, report: Partial< MonthlyDuePaymentDTO>) => {
    return axios.put<MonthlyDuePaymentResponse>(`${BASE_URL}/updateReport/${id}`, report);
};

export const deleteReport = async (id: string) => {
  return axios.delete<MonthlyDuePaymentResponse>(`${BASE_URL}/deleteReport/${id}`);
};