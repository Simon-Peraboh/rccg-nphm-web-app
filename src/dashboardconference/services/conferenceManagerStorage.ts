import type { ConferenceUser } from "../types/conferenceManager";

const TOKEN_KEY = "conference_token";
const USER_KEY = "conference_user";

export const storeConferenceToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getConferenceToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const clearConferenceToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const saveConferenceUser = (user: ConferenceUser) => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getConferenceUser = (): ConferenceUser | null => {
  const raw = sessionStorage.getItem(USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as ConferenceUser;
  } catch {
    return null;
  }
};

export const isConferenceUserLoggedIn = () => {
  return !!getConferenceToken();
};

export const clearConferenceSession = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const getConferenceUserRole = (): "member" | "admin" | null => {
  const user = getConferenceUser();
  return user?.role ?? null;
};