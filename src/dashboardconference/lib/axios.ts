import axios from "axios";
import { getConferenceToken} from "../services/conferenceManagerStorage";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://app2.rccgphm.org/api";

export const conferenceApi = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/+$/, "")}/conference-manager`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

conferenceApi.interceptors.request.use(
  (config) => {
    const token = getConferenceToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

conferenceApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
