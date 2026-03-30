import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createQuarterlyReportAPICall,
  deleteQuarterlyReportAPICall,
  getAllQuarterlyReportsAPICall,
  getQuarterlyReportAPICall,
  updateQuarterlyReportAPICall,
} from "../services/quarterlyReportService";
import type { QuarterlyReportDTO } from "../types/quarterlyReport";

export const quarterlyReportQueryKeys = {
  all: ["quarterly-report", "all"] as const,
  detail: (id: string) => ["quarterly-report", "detail", id] as const,
};

export const useQuarterlyReports = () =>
  useQuery({
    queryKey: quarterlyReportQueryKeys.all,
    queryFn: getAllQuarterlyReportsAPICall,
  });

export const useQuarterlyReport = (id?: string) =>
  useQuery({
    queryKey: quarterlyReportQueryKeys.detail(id ?? ""),
    queryFn: () => getQuarterlyReportAPICall(id as string),
    enabled: !!id,
  });

export const useCreateQuarterlyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: QuarterlyReportDTO) =>
      createQuarterlyReportAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Report created successfully");
      queryClient.invalidateQueries({ queryKey: quarterlyReportQueryKeys.all });
    },
  });
};

export const useUpdateQuarterlyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<QuarterlyReportDTO>;
    }) => updateQuarterlyReportAPICall(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Report updated successfully");
      queryClient.invalidateQueries({ queryKey: quarterlyReportQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: quarterlyReportQueryKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteQuarterlyReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteQuarterlyReportAPICall(id),
    onSuccess: (data) => {
      toast.success(data.message || "Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: quarterlyReportQueryKeys.all });
    },
  });
};