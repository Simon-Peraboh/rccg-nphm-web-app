import axios from "axios";
import { getConferenceToken} from "../services/conferenceManagerStorage";

export const conferenceApi = axios.create({
  baseURL: "https://app.rccgphm.org/api/conference-manager",
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