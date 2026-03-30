import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createMinistryActivityAPICall,
  deleteMinistryActivityAPICall,
  getAllMinistryActivitiesAPICall,
  getMinistryActivityAPICall,
  getPublicMinistryActivitiesAPICall,
  toggleMinistryActivityPublishAPICall,
  updateMinistryActivityAPICall,
} from "../services/ministryActivitiesService";
import type {
  MinistryActivityDTO,
  MinistryActivityFormValues,
  MinistryActivityResponse,
  PublicMinistryActivity,
} from "../types/ministryActivities";

export const ministryActivitiesQueryKeys = {
  all: ["ministry-activities", "all"] as const,
  detail: (id: string) => ["ministry-activities", "detail", id] as const,
  publicAll: ["ministry-activities", "public", "all"] as const,
};

export const useMinistryActivities = () =>
  useQuery<MinistryActivityDTO[]>({
    queryKey: ministryActivitiesQueryKeys.all,
    queryFn: getAllMinistryActivitiesAPICall,
  });

export const useMinistryActivity = (id?: string) =>
  useQuery<MinistryActivityDTO>({
    queryKey: ministryActivitiesQueryKeys.detail(id ?? ""),
    queryFn: () => getMinistryActivityAPICall(id as string),
    enabled: !!id,
  });

export const usePublicMinistryActivities = () =>
  useQuery<PublicMinistryActivity[]>({
    queryKey: ministryActivitiesQueryKeys.publicAll,
    queryFn: getPublicMinistryActivitiesAPICall,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateMinistryActivity = () => {
  const queryClient = useQueryClient();

  return useMutation<MinistryActivityResponse, Error, MinistryActivityFormValues>({
    mutationFn: createMinistryActivityAPICall,
    onSuccess: (data) => {
      toast.success(data.message || "Activity created successfully");
      queryClient.invalidateQueries({ queryKey: ministryActivitiesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ministryActivitiesQueryKeys.publicAll });
    },
  });
};

export const useUpdateMinistryActivity = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MinistryActivityResponse,
    Error,
    { id: string; payload: Partial<MinistryActivityFormValues> }
  >({
    mutationFn: ({ id, payload }) => updateMinistryActivityAPICall(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Activity updated successfully");
      queryClient.invalidateQueries({ queryKey: ministryActivitiesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ministryActivitiesQueryKeys.publicAll });
      queryClient.invalidateQueries({
        queryKey: ministryActivitiesQueryKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteMinistryActivity = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: deleteMinistryActivityAPICall,
    onSuccess: (data) => {
      toast.success(data.message || "Activity deleted successfully");
      queryClient.invalidateQueries({ queryKey: ministryActivitiesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ministryActivitiesQueryKeys.publicAll });
    },
  });
};

export const useToggleMinistryActivityPublish = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MinistryActivityResponse,
    Error,
    { id: string; isPublished: boolean }
  >({
    mutationFn: ({ id, isPublished }) =>
      toggleMinistryActivityPublishAPICall(id, isPublished),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ministryActivitiesQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ministryActivitiesQueryKeys.publicAll });
    },
  });
};