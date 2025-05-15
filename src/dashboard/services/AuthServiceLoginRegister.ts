// AuthServiceLoginRegister.ts
import axios from 'axios';

const AUTH_REST_API_BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/auth';

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  roles?: string[];
}

export interface LoginDTO {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  role: string;
  message?: string; // Optional message from the backend
  refreshToken: string;
}

export interface RefreshTokenDTO {
  refreshToken: string;
}

// Function to store refresh token
export const storeRefreshToken = (refreshToken: string) => {
  console.log('Storing refresh token:', refreshToken);
  localStorage.setItem('refreshToken', refreshToken);
};

// Function to retrieve refresh token
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};


// Function to clear any cached tokens
export const clearToken = () => {
  console.log('Clearing stored tokens');
  localStorage.removeItem('token');
  sessionStorage.clear();
};

export const registerAPICall = (registerObj: RegisterDTO) => {
  return axios.post(`${AUTH_REST_API_BASE_URL}/register`, registerObj);
};

export const loginAPICall = async (loginObj: LoginDTO) => {
  try {
      clearToken(); // Clear previous tokens
      console.log('Attempting login with:', loginObj);
      
      // Make the login request
      const response = await axios.post<AuthResponse>(`${AUTH_REST_API_BASE_URL}/login`, loginObj);
      console.log('Login successful, response:', response.data);
      
      const { accessToken, refreshToken, tokenType, role, message } = response.data;
      
      // Store the access token and refresh token
      storeToken(`${tokenType} ${accessToken}`);
      storeRefreshToken(refreshToken);  // New function to store the refresh token

      return { accessToken, refreshToken, tokenType, role, message };
  } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
          console.error('Login failed with status:', error.response.status);
          console.error('Response data:', error.response.data);
          const message = error.response.status === 401
              ? 'Unauthorized: Incorrect username or password'
              : error.response.data.message || 'Login failed';
          throw new Error(message);
      } else {
          console.error('Login failed due to a network or unknown error:', error);
          throw new Error('Login failed: Unable to connect to the server');
      }
  }
};


export const storeToken = (token: string) => {
  const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const expirationDate = new Date(tokenPayload.exp * 1000); // Convert expiration from seconds to milliseconds

  console.log('Storing token:', token);
  console.log('Token expiration time:', expirationDate);
  console.log('Current time:', new Date());

  localStorage.setItem('token', token);
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      const expirationDate = new Date(tokenPayload.exp * 1000); // Convert expiration from seconds to milliseconds
      const currentTime = new Date();

      console.log('Retrieved token:', token);
      console.log('Token expiration time:', expirationDate);
      console.log('Current time:', currentTime);

      if (currentTime >= expirationDate) {
          console.warn('Token is expired, clearing token');
          clearToken();
          return null;
      }

      return token;
  }
  return null;
};

interface LoggedInUser {
  username: string;
  role: string;
}

export const saveLoggedInUser = ({ username, role }: LoggedInUser) => {
  console.log('Saving logged-in user:', { username, role });
  sessionStorage.setItem('authenticatedUser', username);
  sessionStorage.setItem('role', role);
};

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem('authenticatedUser');
  console.log('Is user logged in?', username !== null);
  return username !== null;
};

export const getLoggedInUser = (): LoggedInUser | null => {
  const username = sessionStorage.getItem('authenticatedUser');
  const role = sessionStorage.getItem('role');
  console.log('Retrieved logged-in user:', { username, role });
  if (username && role) {
      return { username, role };
  }
  return null;
};

export const logout = () => {
  console.log('Logging out, clearing storage');
  localStorage.clear();
  sessionStorage.clear();
};

axios.interceptors.request.use(
  config => {
      const token = getToken();
      if (token) {
          config.headers['Authorization'] = token;
      }
      return config;
  },
  error => {
      console.error('Request error:', error);
      return Promise.reject(error);
  }
);


export interface RefreshTokenDTO {
  refreshToken: string;
}

export const refreshTokenAPICall = (refreshTokenObj: RefreshTokenDTO) => {
  return axios.post<AuthResponse>(`${AUTH_REST_API_BASE_URL}/refresh`, refreshTokenObj);
};
