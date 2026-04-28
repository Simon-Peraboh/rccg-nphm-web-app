import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createNationalReportAPICall,
  deleteNationalReportAPICall,
  getAllNationalReportsAPICall,
  getNationalReportAPICall,
  updateNationalReportAPICall,
} from "../services/nationalReportService";
import type { NationalReportDTO } from "../types/nationalReport";

export const nationalReportQueryKeys = {
  all: ["national-report", "all"] as const,
  detail: (id: string) => ["national-report", "detail", id] as const,
};

export const useNationalReports = () =>
  useQuery({
    queryKey: nationalReportQueryKeys.all,
    queryFn: getAllNationalReportsAPICall,
  });

export const useNationalReport = (id?: string) =>
  useQuery({
    queryKey: nationalReportQueryKeys.detail(id ?? ""),
    queryFn: () => getNationalReportAPICall(id as string),
    enabled: !!id,
  });

export const useCreateNationalReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NationalReportDTO) => createNationalReportAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Report created successfully");
      queryClient.invalidateQueries({ queryKey: nationalReportQueryKeys.all });
    },
  });
};

export const useUpdateNationalReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<NationalReportDTO>;
    }) => updateNationalReportAPICall(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Report updated successfully");
      queryClient.invalidateQueries({ queryKey: nationalReportQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: nationalReportQueryKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteNationalReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNationalReportAPICall(id),
    onSuccess: (data) => {
      toast.success(data.message || "Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: nationalReportQueryKeys.all });
    },
  });
};