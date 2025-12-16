import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://app2.rccgphm.org/api/specialProjects';


// Auth-only instance
const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});


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
    return axios.post<SpecialProjectsReportResponse>(`${BASE_URL}/createReport`, report);
};

export const getReport = async (id: string) => {
    return axios.get<SpecialProjectsReportDTO>(`${BASE_URL}/getReport/${id}`);
};

export const getAllProjects = async () => {
    return axios.get<SpecialProjectsReportDTO[]>(`${BASE_URL}/getAllProjects`);
};

export const updateReport = (id: string, report: Partial<SpecialProjectsReportDTO>) => {
    return axios.put<SpecialProjectsReportResponse>(`${BASE_URL}/updateReport/${id}`, report);
};

export const deleteReport = async (id: string) => {
    return axios.delete<SpecialProjectsReportResponse>(`${BASE_URL}/deleteReport/${id}`);
};
