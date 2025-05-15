import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/nationalMonthlyReport';
const USER_PROFILE_API_BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/userprofile';
const NATIONAL_MONTHLY_REPORT_API_BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/nationalMonthlyReport';

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

export interface MonthlyReportDTO {
    id?: string;
    state: string;
    region: string;
    province: string;
    coordinatorName: string;
    prisonVisited?: string;
    hospitalVisited?: string;
    policeStationVisited?: string;
    others?: string;
    items: string;
    amountBudgeted: string;
    amountSpent: string;
    teamMembers: string;
    soulsWon: string;
    challenges?: string;
    suggestion?: string;
    activityDate: string;
    createdDate: string;
    remarks?: string;
}

export interface MonthlyReportResponse {
    message: string;
    monthlyReportDTO?: MonthlyReportDTO;
}

export const createReport = async (report: MonthlyReportDTO) => {
    return axios.post<MonthlyReportResponse>(`${BASE_URL}`, report);
};

export const getReports = async () => {
    return axios.get<MonthlyReportDTO[]>(`${BASE_URL}`);
};

export const getReportById = async (id: string) => {
    return axios.get<MonthlyReportDTO>(`${BASE_URL}/${id}`);
};

export const updateReport = (id: string, report: MonthlyReportDTO) => {
    return axios.put<MonthlyReportResponse>(`${BASE_URL}/${id}`, report);
};

export const deleteReport = async (id: string) => {
    return axios.delete<MonthlyReportResponse>(`${BASE_URL}/${id}`);
};

// Fetch total number of members registered
export const fetchTotalMembers = async () => {
    const response = await axios.get(USER_PROFILE_API_BASE_URL);
    return response.data.length; // Assuming the API returns an array of users
};

// Fetch national monthly report data
export const fetchNationalMonthlyReport = async () => {
    const response = await axios.get(NATIONAL_MONTHLY_REPORT_API_BASE_URL);
    return response.data; // Adjust this according to your API's response structure
};
