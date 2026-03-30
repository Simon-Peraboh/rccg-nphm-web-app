import axios from "axios";
import { getConferenceToken} from "../services/conferenceManagerStorage";

export const conferenceApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/conference-manager",
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