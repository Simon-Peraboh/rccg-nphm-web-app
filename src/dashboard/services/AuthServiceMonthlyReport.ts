import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';  // Assuming AuthService has a getToken function

const BASE_URL = 'https://nphmapp.rccgphm.org/api/monthlyReports';
const USER_PROFILE_API_BASE_URL = 'https://nphmapp.rccgphm.org/api/userProfile/getAllUsers';
const NATIONAL_MONTHLY_REPORT_API_BASE_URL = 'https://nphmapp.rccgphm.org/api/monthlyReports/getAllReports';



// Auth-only instance
const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});



export interface MonthlyReportDTO {
    id?: string;
    state: string;
    region: string;
    province: string;
    coordinator_name: string;
    prison_visited?: string;
    hospital_visited?: string;
    police_station_visited?: string;
    others?: string;
    items: string;
    amount_budgeted: string;
    amount_spent: string;
    team_members: string;
    souls_won: string;
    challenges?: string;
    suggestion?: string;
    remarks?: string;
    report_created_by: string;
    activity_date: string;

}

export interface MonthlyReportResponse {
    message: string;
    monthlyReportDTO?: MonthlyReportDTO;
}

export const createReport = (report: MonthlyReportDTO) => {
  return authAxios.post<MonthlyReportResponse>(`${BASE_URL}/createReport`, report);
};

export const getAllReports = async () => {
    return axios.get<MonthlyReportDTO[]>(`${BASE_URL}/getAllReports`);
};

export const getReport = async (id: string) => {
    return axios.get<MonthlyReportDTO>(`${BASE_URL}/getReport/${id}`);
};


export const updateReport = (id: string, report: Partial<MonthlyReportDTO>) => {
  return authAxios.put<MonthlyReportResponse>(`${BASE_URL}/updateReport/${id}`, report);
};

export const deleteReport = async (id: string) => {
  return authAxios.delete<MonthlyReportResponse>(`${BASE_URL}/deleteReport/${id}`);
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

// Fetch total expenditure from all monthly reports
export const fetchTotalExpenditure = async (): Promise<number> => {
  const response = await axios.get<MonthlyReportDTO[]>(NATIONAL_MONTHLY_REPORT_API_BASE_URL);

  return response.data.reduce((acc, report) => {
    const cleanValue = String(report.amount_spent || '0')
      .replace(/[^0-9.]/g, '') // remove commas, currency, text
      .trim();

    const parsed = parseFloat(cleanValue);
    return acc + (isNaN(parsed) ? 0 : parsed);
  }, 0);
};

