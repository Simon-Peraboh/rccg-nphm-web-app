import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://app.rccgphm.org/api/secretaryNote';


const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});


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

export const createNote = async (report: SecretaryNoteDTO) => {
    return axios.post<SecretaryNoteResponse>(`${BASE_URL}/createNote`, report);
};

export const getAllNotes = async () => {
    return axios.get<SecretaryNoteDTO[]>(`${BASE_URL}/getAllNotes`);
};

export const getNote = async (id: string) => {
    return axios.get<SecretaryNoteDTO>(`${BASE_URL}/getNote/${id}`);
};

export const updateNote = (id: string, report: Partial<SecretaryNoteDTO>) => {
    return axios.put<SecretaryNoteResponse>(`${BASE_URL}/updateNote/${id}`, report);
};

export const deleteNote = async (id: string) => {
    return axios.delete<SecretaryNoteResponse>(`${BASE_URL}/deleteNote/${id}`);
};
