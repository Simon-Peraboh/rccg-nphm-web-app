import axios from "axios";
import { getConferenceToken} from "../services/conferenceManagerStorage";

export const conferenceApi = axios.create({
<<<<<<< HEAD
  baseURL: "https://app2.rccgphm.org/api/conference-manager",
=======
  baseURL: "http://127.0.0.1:8000/api/conference-manager",
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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