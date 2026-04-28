export interface RegisterDTO {
  name: string;
  surname: string;
  email: string;
  role: string;
}

export interface LoginDTO {
  usernameOrEmail: string;
  password: string;
}

export interface DashboardUser {
  id?: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  activation_token?: string | null;
  email_verified_at?: string | null;
  password_reset_token?: string | null;
  password_reset_expires_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  token: string;
  user: DashboardUser;
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

export interface ActivateAccountDTO {
  token: string;
  temporary_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface LoggedInUser {
  email: string;
  role: string;
}

export interface ApiMessageResponse {
  message?: string;
  error?: string;
}