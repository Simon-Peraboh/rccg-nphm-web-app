import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  activateDashboardAccountAPICall,
  forgotDashboardPasswordAPICall,
  loginDashboardAPICall,
  registerDashboardAPICall,
  resetDashboardPasswordAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/dashboardAuthService";
import type { DashboardLoginDTO } from "../types/dashboard";
import type {
  ActivateAccountDTO,
  ForgotPasswordDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from "../types/auth";

export const useDashboardLogin = () =>
  useMutation({
    mutationFn: (payload: DashboardLoginDTO) => loginDashboardAPICall(payload),
    onSuccess: (data) => {
      if (!data?.token || !data?.user) {
        throw new Error("Login response did not include token or user data.");
      }

      storeToken(data.token);
      saveLoggedInUser(data.user);

      toast.success(data.message || "Login successful");
    },
  });

export const useDashboardRegister = () =>
  useMutation({
    mutationFn: (payload: RegisterDTO) => registerDashboardAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "User registered successfully");
    },
  });

export const useDashboardAccountActivation = () =>
  useMutation({
    mutationFn: (payload: ActivateAccountDTO) =>
      activateDashboardAccountAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Account activated successfully");
    },
  });

export const useDashboardForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordDTO) =>
      forgotDashboardPasswordAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Reset link sent successfully");
    },
  });

export const useDashboardResetPassword = () =>
  useMutation({
    mutationFn: (payload: ResetPasswordDTO) =>
      resetDashboardPasswordAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful");
    },
  });