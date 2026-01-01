import axios from 'axios';

const AUTH_REST_API_BASE_URL = "https://app.rccgphm.org/api/userManager";

export interface RegisterDTO {
  name: string;
  surname: string;
  email: string;
  role: string; // ✅ not string[]
}


export interface LoginDTO {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    name: string;
    surname: string;
    email: string;
    role: string;
  };
  message?: string;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  password: string;
  password_confirmation: string;
}

export const clearToken = () => {
  localStorage.removeItem('token');
  sessionStorage.clear();
};

export const registerAPICall = (registerObj: RegisterDTO) => {
  return axios.post(`${AUTH_REST_API_BASE_URL}/createUser`, registerObj);
};


export const loginAPICall = async (loginData: LoginDTO) => {
  return axios.post(`${AUTH_REST_API_BASE_URL}/login`, {
    email: loginData.usernameOrEmail,
    password: loginData.password,
  });
};


export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

interface LoggedInUser {
  email: string;
  role: string;
}

export const saveLoggedInUser = ({ email, role }: LoggedInUser) => {
  sessionStorage.setItem('authenticatedUser', email);
  sessionStorage.setItem('role', role);
};

export const isUserLoggedIn = () => {
  return !!sessionStorage.getItem('authenticatedUser');
};

export const getLoggedInUser = (): LoggedInUser | null => {
  const email = sessionStorage.getItem('authenticatedUser');
  const role = sessionStorage.getItem('role');
  return email && role ? { email, role } : null;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const activateAccountAPICall = (
  token: string,
  temporaryPassword: string,
  newPassword: string,
  confirmPassword: string,
) => {
  return axios.post(`${AUTH_REST_API_BASE_URL}/accountActivation`, {
    token,
    temporary_password: temporaryPassword,
    new_password: newPassword,
    new_password_confirmation: confirmPassword,
  });
};

// ✅ Forgot Password API call
export const forgotPasswordAPICall = (data: ForgotPasswordDTO) => {
  return axios.post(`${AUTH_REST_API_BASE_URL}/forgotPassword`, data);

};



export const resetPasswordAPICall = (data: ResetPasswordDTO) => {
  return axios.post(`${AUTH_REST_API_BASE_URL}/resetPassword`, data);
};


// Attach token globally
axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
