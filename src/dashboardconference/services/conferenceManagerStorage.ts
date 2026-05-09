import type { ConferenceUser } from "../types/conferenceManager";

const TOKEN_KEY = "conference_token";
const USER_KEY = "conference_user";

const safeSetItem = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Browser storage can be restricted on some mobile/private sessions.
  }

  try {
    localStorage.setItem(key, value);
  } catch {
    // Keep login flow from crashing if persistent storage is unavailable.
  }
};

const safeGetItem = (key: string) => {
  try {
    const sessionValue = sessionStorage.getItem(key);

    if (sessionValue) {
      return sessionValue;
    }
  } catch {
    // Fall back to local storage below.
  }

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeRemoveItem = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Ignore storage cleanup failures.
  }

  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage cleanup failures.
  }
};

export const storeConferenceToken = (token: string) => {
  safeSetItem(TOKEN_KEY, token);
};

export const getConferenceToken = () => {
  return safeGetItem(TOKEN_KEY);
};

export const clearConferenceToken = () => {
  safeRemoveItem(TOKEN_KEY);
};

export const saveConferenceUser = (user: ConferenceUser) => {
  safeSetItem(USER_KEY, JSON.stringify(user));
};

export const getConferenceUser = (): ConferenceUser | null => {
  const raw = safeGetItem(USER_KEY);

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
  safeRemoveItem(TOKEN_KEY);
  safeRemoveItem(USER_KEY);
};

export const getConferenceUserRole = (): "member" | "admin" | null => {
  const user = getConferenceUser();
  return user?.role ?? null;
};
