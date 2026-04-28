import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createMonthlyReportAPICall,
  deleteMonthlyReportAPICall,
  fetchNationalMonthlyReportAPICall,
  fetchTotalExpenditureAPICall,
  fetchTotalMembersAPICall,
  getAllMonthlyReportsAPICall,
  getMonthlyReportAPICall,
  getMonthlyReportProvincesAPICall,
  getMonthlyReportRegionsAPICall,
  updateMonthlyReportAPICall,
} from "../services/monthlyReportService";
import type { MonthlyReportDTO } from "../types/monthlyReport";

export const monthlyReportQueryKeys = {
  all: ["monthly-report", "all"] as const,
  detail: (id: string) => ["monthly-report", "detail", id] as const,
  regions: ["monthly-report", "regions"] as const,
  provinces: (region: string) => ["monthly-report", "provinces", region] as const,
  totalMembers: ["monthly-report", "total-members"] as const,
  nationalReports: ["monthly-report", "national-reports"] as const,
  totalExpenditure: ["monthly-report", "total-expenditure"] as const,
};

export const useMonthlyReports = () =>
  useQuery({
    queryKey: monthlyReportQueryKeys.all,
    queryFn: getAllMonthlyReportsAPICall,
  });

export const useMonthlyReport = (id?: string) =>
  useQuery({
    queryKey: monthlyReportQueryKeys.detail(id ?? ""),
    queryFn: () => getMonthlyReportAPICall(id as string),
    enabled: !!id,
  });

export const useMonthlyReportRegions = () =>
  useQuery({
    queryKey: monthlyReportQueryKeys.regions,
    queryFn: getMonthlyReportRegionsAPICall,
  });

export const useMonthlyReportProvinces = (region?: string) =>
  useQuery({
    queryKey: monthlyReportQueryKeys.provinces(region ?? ""),
    queryFn: () => getMonthlyReportProvincesAPICall(region as string),
    enabled: !!region,
  });

export const useCreateMonthlyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MonthlyReportDTO) => createMonthlyReportAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Report submitted successfully");
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.nationalReports });
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.totalExpenditure });
    },
  });
};

export const useUpdateMonthlyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<MonthlyReportDTO>;
    }) => updateMonthlyReportAPICall(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Report updated successfully");
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: monthlyReportQueryKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.nationalReports });
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.totalExpenditure });
    },
  });
};

export const useDeleteMonthlyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMonthlyReportAPICall(id),
    onSuccess: (data) => {
      toast.success(data.message || "Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.nationalReports });
      queryClient.invalidateQueries({ queryKey: monthlyReportQueryKeys.totalExpenditure });
    },
  });
};

export const useTotalMembers = () =>
  useQuery({
    queryKey: monthlyReportQueryKeys.totalMembers,
    queryFn: fetchTotalMembersAPICall,
  });

export const useNationalMonthlyReports = () =>
  useQuery({
    queryKey: monthlyReportQueryKeys.nationalReports,
    queryFn: fetchNationalMonthlyReportAPICall,
  });

export const useTotalExpenditure = () =>
  useQuery({
    queryKey: monthlyReportQueryKeys.totalExpenditure,
    queryFn: fetchTotalExpenditureAPICall,
  });