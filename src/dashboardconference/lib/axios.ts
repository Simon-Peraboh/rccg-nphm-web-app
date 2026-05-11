import axios from "axios";
import { getConferenceToken } from "../services/conferenceManagerStorage";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://app.rccgphm.org/api";

export const conferenceApi = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/+$/, "")}/conference-manager`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const publicAuthPaths = [
  "/auth/register",
  "/auth/member-login",
  "/auth/assisted-login",
  "/auth/admin-login",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const isPublicConferenceAuthRequest = (url?: string) => {
  if (!url) return false;

  const normalizedUrl = url.startsWith("http")
    ? new URL(url).pathname.replace(/^\/api\/conference-manager/, "")
    : url;

  return publicAuthPaths.some((path) => normalizedUrl.startsWith(path));
};

conferenceApi.interceptors.request.use(
  (config) => {
    const token = getConferenceToken();

    if (isPublicConferenceAuthRequest(config.url)) {
      delete config.headers.Authorization;
      return config;
    }

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
