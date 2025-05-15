import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/secretaryNote';

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

export interface SecretaryNoteDTO {
    id?: string;
    meetingVenue: string;
    meetingAnchor: string;
    attendanceMen: string;
    attendanceWomen: string;
    attendanceChildren: string;
    attendanceTotal: string;
    detailOfMeeting: string;
    actionablePoints: string;
    actionablePointsAssigned: string;
    meetingDate: string;
    createdDate?: string;
  }
  

export interface SecretaryNoteResponse {
    message: string;
    secretaryNoteDTO?: SecretaryNoteDTO;
}

export const createReport = async (report: SecretaryNoteDTO) => {
    return axios.post<SecretaryNoteResponse>(`${BASE_URL}`, report);
};

export const getReports = async () => {
    return axios.get<SecretaryNoteDTO[]>(`${BASE_URL}`);
};

export const getReportById = async (id: string) => {
    return axios.get<SecretaryNoteDTO>(`${BASE_URL}/${id}`);
};

export const updateReport = (id: string, report: SecretaryNoteDTO) => {
    return axios.put<SecretaryNoteResponse>(`${BASE_URL}/${id}`, report);
};

export const deleteReport = async (id: string) => {
    return axios.delete<SecretaryNoteResponse>(`${BASE_URL}/${id}`);
};
