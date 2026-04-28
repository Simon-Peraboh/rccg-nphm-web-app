import axios from "axios";
import { getToken, logout } from "../services/dashboardAuthService";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://app2.rccgphm.org/api";

export const dashboardApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

dashboardApi.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

dashboardApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);