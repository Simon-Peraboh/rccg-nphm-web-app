import type { ReactNode } from "react";

export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  link: string;
  trend?: string;
  icon: ReactNode;
}

export interface DashboardMetricsResponse {
  totalMembers: number;
  totalMonthlyReports: number;
  totalExpenditure: number;
  totalSoulsSaved: number;
}

export interface DashboardLoginDTO {
  usernameOrEmail: string;
  password: string;
}

export interface DashboardLoggedInUser {
  id?: number;
  name?: string;
  surname?: string;
  email: string;
  role: string;
}

export interface DashboardAuthResponse {
  message?: string;
  token: string;
  user: DashboardLoggedInUser;
}

export interface TopReportingProvince {
  province: string;
  totalReports: number;
  activeMonths: number;
  totalSouls: number;
  totalExpenditure: number;
}

export interface DashboardMetricsResponse {
  totalMembers: number;
  totalMonthlyReports: number;
  totalExpenditure: number;
  totalSoulsSaved: number;
  topReportingProvinces: TopReportingProvince[];
}