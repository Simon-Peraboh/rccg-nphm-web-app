import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createSpecialProjectAPICall,
  deleteSpecialProjectAPICall,
  getAllSpecialProjectsAPICall,
  getPublicSpecialProjectAPICall,
  getPublicSpecialProjectsAPICall,
  getSpecialProjectAPICall,
  updateSpecialProjectAPICall,
} from "../services/specialProjectsService";
import type {
  PublicSpecialProject,
  SpecialProjectsReportDTO,
  SpecialProjectsReportResponse,
} from "../types/specialProjects";

export const specialProjectsQueryKeys = {
  adminAll: ["special-projects", "admin", "all"] as const,
  adminDetail: (id: string) => ["special-projects", "admin", "detail", id] as const,
  publicAll: ["special-projects", "public", "all"] as const,
  publicDetail: (slug: string) => ["special-projects", "public", "detail", slug] as const,
};

export const useSpecialProjects = () =>
  useQuery<SpecialProjectsReportDTO[]>({
    queryKey: specialProjectsQueryKeys.adminAll,
    queryFn: getAllSpecialProjectsAPICall,
  });

export const useSpecialProject = (id?: string) =>
  useQuery<SpecialProjectsReportDTO>({
    queryKey: specialProjectsQueryKeys.adminDetail(id ?? ""),
    queryFn: () => getSpecialProjectAPICall(id as string),
    enabled: !!id,
  });

export const usePublicSpecialProjects = () =>
  useQuery<PublicSpecialProject[]>({
    queryKey: specialProjectsQueryKeys.publicAll,
    queryFn: getPublicSpecialProjectsAPICall,
    staleTime: 1000 * 60 * 5,
  });

export const usePublicSpecialProject = (slug?: string) =>
  useQuery<PublicSpecialProject>({
    queryKey: specialProjectsQueryKeys.publicDetail(slug ?? ""),
    queryFn: () => getPublicSpecialProjectAPICall(slug as string),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateSpecialProject = () => {
  const queryClient = useQueryClient();

  return useMutation<SpecialProjectsReportResponse, Error, SpecialProjectsReportDTO>({
    mutationFn: createSpecialProjectAPICall,
    onSuccess: (data) => {
      toast.success(data.message || "Project report created successfully");
      queryClient.invalidateQueries({ queryKey: specialProjectsQueryKeys.adminAll });
      queryClient.invalidateQueries({ queryKey: specialProjectsQueryKeys.publicAll });
    },
  });
};

export const useUpdateSpecialProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SpecialProjectsReportResponse,
    Error,
    { id: string; payload: Partial<SpecialProjectsReportDTO> }
  >({
    mutationFn: ({ id, payload }) => updateSpecialProjectAPICall(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Project report updated successfully");
      queryClient.invalidateQueries({ queryKey: specialProjectsQueryKeys.adminAll });
      queryClient.invalidateQueries({
        queryKey: specialProjectsQueryKeys.adminDetail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: specialProjectsQueryKeys.publicAll });
    },
  });
};

export const useDeleteSpecialProject = () => {
  const queryClient = useQueryClient();

  return useMutation<SpecialProjectsReportResponse, Error, string>({
    mutationFn: deleteSpecialProjectAPICall,
    onSuccess: (data) => {
      toast.success(data.message || "Project report deleted successfully");
      queryClient.invalidateQueries({ queryKey: specialProjectsQueryKeys.adminAll });
      queryClient.invalidateQueries({ queryKey: specialProjectsQueryKeys.publicAll });
    },
  });
};