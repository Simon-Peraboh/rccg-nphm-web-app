// ✅ apicalls/attendance/api.ts
import axios from 'axios';

const API_BASE_URL = "https://app.rccgphm.org/api"; // ✅ Manually define the API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// ✅ Fetch registered users for attendance
export const getUsers = async () => {
    const response = await axiosInstance.get('/attendance/users');
    return response.data;
};

// ✅ Submit attendance
export const submitAttendance = async (data: object) => {
    return axiosInstance.post('/attendance/register', data);
};

// ✅ Admin acknowledges attendance
export const updateAttendance = async (id: number) => {
    return axiosInstance.patch(`/attendance/admin/${id}`);
};

// ✅ Admin fetch all attendance (optional)
export const fetchAllAttendance = async () => {
    const response = await axiosInstance.get('/attendance/all');
    return response.data;
};

export default axiosInstance;
