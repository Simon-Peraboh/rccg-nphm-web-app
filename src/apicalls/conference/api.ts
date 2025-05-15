// ✅ apicalls/conference/api.ts

import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api"; // ✅ Manually define the API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // ✅ Include credentials if needed
});

// ✅ Fetch Users
export const getUsers = async () => {
    const response = await axiosInstance.get('/conference');
    return response.data;
};

// ✅ Submit Conference (POST)
export const submitConference = async (data: object) => {
    return axiosInstance.post('/conference', data);
};

// ✅ Update Conference (PUT)
export const updateConference = async (id: number, data: object) => {
    return axiosInstance.put(`/conference/${id}`, data);
};

export default axiosInstance;
