import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/specialProjects';

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

export interface SpecialProjectsReportDTO {
    id?: string;
    projectName: string;
    projectDescription: string;
    projectLocation: string;
    state: string;
    projectEstimate: string;
    projectCost: string;
    projectStartDate: string;
    projectCompletedDate: string;
    projectManager: string;
    projectAid: string;
    projectRemarks?: string;
  }


export interface SpecialProjectsReportResponse {
    message: string;
    specialProjectsReportDTO?: SpecialProjectsReportDTO;
}

export const createReport = async (report: SpecialProjectsReportDTO) => {
    return axios.post<SpecialProjectsReportResponse>(`${BASE_URL}`, report);
};

export const getProjectById = async (id: string) => {
    return axios.get<SpecialProjectsReportDTO>(`${BASE_URL}/${id}`);
};

export const getReports = async () => {
    return axios.get<SpecialProjectsReportDTO[]>(`${BASE_URL}`);
};

export const updateReport = (id: string, report: SpecialProjectsReportDTO) => {
    return axios.put<SpecialProjectsReportResponse>(`${BASE_URL}/${id}`, report);
};

export const deleteReport = async (id: string) => {
    return axios.delete<SpecialProjectsReportResponse>(`${BASE_URL}/${id}`);
};
