import axios from 'axios';

const AUTH_REST_API_BASE_URL = `${import.meta.env.VITE_API_URL}/userManager`;

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

export const clearToken = () => {
  localStorage.removeItem('token');
  sessionStorage.clear();
};

export const registerAPICall = (registerObj: RegisterDTO) => {
  return axios.post(`${AUTH_REST_API_BASE_URL}/createUser`, registerObj);
};

// export const loginAPICall = async (loginData: LoginDTO) => {
//   try {
//     const response = await axios.post(`${AUTH_REST_API_BASE_URL}/login`, {
//       email: loginData.usernameOrEmail,
//       password: loginData.password,
//     });

//     toast.success('Login successful');
//     return response;

//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {

//       const backendError =
//         error.response?.data?.error ||
//         error.response?.data?.message ||
//         'Login failed';

//       toast.error(backendError);
//       throw new Error(backendError);

//     } else {
//       toast.error('Unexpected error');
//       throw new Error('Unexpected error');
//     }
//   }
// };

export const loginAPICall = async (loginData: LoginDTO) => {
  return axios.post(`${AUTH_REST_API_BASE_URL}/login`, {
    email: loginData.usernameOrEmail,
    password: loginData.password,
  });
};



// export const loginAPICall = async (loginData: LoginDTO) => {
//   try {
//     const response = await axios.post(`${AUTH_REST_API_BASE_URL}/login`, {
//       email: loginData.usernameOrEmail,
//       password: loginData.password,
//     });

//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const message =
//         error.response?.data?.message || 'Unable to login. Try again later.';
//       toast.error(message);
//       throw new Error(message);
//     }

//     toast.error('Network error. Please try again.');
//     throw new Error('Network error');
//   }
// };


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
