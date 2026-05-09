import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createUpcomingProgramAPICall,
  deleteUpcomingProgramAPICall,
  getAllUpcomingProgramsAPICall,
  toggleUpcomingProgramPublishAPICall,
} from "../services/upcomingProgramService";
import type {
  UpcomingProgramDTO,
  UpcomingProgramFormValues,
  UpcomingProgramResponse,
} from "../types/upcomingProgram";

export const upcomingProgramQueryKeys = {
  all: ["upcoming-programs", "all"] as const,
  publicAll: ["public", "upcoming-programs"] as const,
};

export const useUpcomingPrograms = () =>
  useQuery<UpcomingProgramDTO[]>({
    queryKey: upcomingProgramQueryKeys.all,
    queryFn: getAllUpcomingProgramsAPICall,
  });

export const useCreateUpcomingProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<UpcomingProgramResponse, Error, UpcomingProgramFormValues>({
    mutationFn: createUpcomingProgramAPICall,
    onSuccess: (data) => {
      toast.success(data.message || "Upcoming program created successfully");
      queryClient.invalidateQueries({ queryKey: upcomingProgramQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: upcomingProgramQueryKeys.publicAll });
    },
  });
};

export const useDeleteUpcomingProgram = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: deleteUpcomingProgramAPICall,
    onSuccess: (data) => {
      toast.success(data.message || "Upcoming program deleted successfully");
      queryClient.invalidateQueries({ queryKey: upcomingProgramQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: upcomingProgramQueryKeys.publicAll });
    },
  });
};

export const useToggleUpcomingProgramPublish = () => {
  const queryClient = useQueryClient();

  return useMutation<UpcomingProgramResponse, Error, { id: string; isPublished: boolean }>({
    mutationFn: ({ id, isPublished }) =>
      toggleUpcomingProgramPublishAPICall(id, isPublished),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: upcomingProgramQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: upcomingProgramQueryKeys.publicAll });
    },
  });
};

