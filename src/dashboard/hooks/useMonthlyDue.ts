import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createMonthlyDueReportAPICall,
  deleteMonthlyDueReportAPICall,
  getAllMonthlyDueReportsAPICall,
  getMonthlyDueReportAPICall,
  updateMonthlyDueReportAPICall,
} from "../services/monthlyDueService";
import type { MonthlyDuePaymentDTO } from "../types/monthlyDue";

export const monthlyDueQueryKeys = {
  all: ["monthly-due", "all"] as const,
  detail: (id: string) => ["monthly-due", "detail", id] as const,
};

export const useMonthlyDueReports = () =>
  useQuery({
    queryKey: monthlyDueQueryKeys.all,
    queryFn: getAllMonthlyDueReportsAPICall,
  });

export const useMonthlyDueReport = (id?: string) =>
  useQuery({
    queryKey: monthlyDueQueryKeys.detail(id ?? ""),
    queryFn: () => getMonthlyDueReportAPICall(id as string),
    enabled: !!id,
  });

export const useCreateMonthlyDueReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MonthlyDuePaymentDTO) =>
      createMonthlyDueReportAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Report created successfully");
      queryClient.invalidateQueries({ queryKey: monthlyDueQueryKeys.all });
    },
  });
};

export const useUpdateMonthlyDueReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<MonthlyDuePaymentDTO>;
    }) => updateMonthlyDueReportAPICall(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Report updated successfully");
      queryClient.invalidateQueries({ queryKey: monthlyDueQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: monthlyDueQueryKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteMonthlyDueReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMonthlyDueReportAPICall(id),
    onSuccess: (data) => {
      toast.success(data.message || "Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: monthlyDueQueryKeys.all });
    },
  });
};