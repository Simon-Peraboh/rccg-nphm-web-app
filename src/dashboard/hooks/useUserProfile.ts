import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createUserProfileAPICall,
  deleteUserProfileAPICall,
  getAllUserProfilesAPICall,
  getLgasAPICall,
  getProvincesAPICall,
  getRegionsAPICall,
  getStatesAPICall,
  getUserProfileAPICall,
  updateUserProfileAPICall,
} from "../services/userProfileService";
import type { UserProfileDTO } from "../types/userProfile";

export const userProfileQueryKeys = {
  all: ["user-profile", "all"] as const,
  regions: ["user-profile", "regions"] as const,
  states: ["user-profile", "states"] as const,
  provinces: (region: string) => ["user-profile", "provinces", region] as const,
  lgas: (state: string) => ["user-profile", "lgas", state] as const,
  detail: (id: string) => ["user-profile", "detail", id] as const,
};

export const useRegions = () =>
  useQuery({
    queryKey: userProfileQueryKeys.regions,
    queryFn: getRegionsAPICall,
  });

export const useStates = () =>
  useQuery({
    queryKey: userProfileQueryKeys.states,
    queryFn: getStatesAPICall,
  });

export const useProvinces = (region?: string) =>
  useQuery({
    queryKey: userProfileQueryKeys.provinces(region ?? ""),
    queryFn: () => getProvincesAPICall(region as string),
    enabled: !!region,
  });

export const useLgas = (state?: string) =>
  useQuery({
    queryKey: userProfileQueryKeys.lgas(state ?? ""),
    queryFn: () => getLgasAPICall(state as string),
    enabled: !!state,
  });

export const useUserProfile = (id?: string) =>
  useQuery({
    queryKey: userProfileQueryKeys.detail(id ?? ""),
    queryFn: () => getUserProfileAPICall(id as string),
    enabled: !!id,
  });

export const useCreateUserProfile = () =>
  useMutation({
    mutationFn: (payload: UserProfileDTO) => createUserProfileAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Profile submitted successfully");
    },
  });

export const useUpdateUserProfile = () =>
  useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UserProfileDTO }) =>
      updateUserProfileAPICall(id, payload),
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully");
    },
  });

  export const useUserProfiles = () =>
  useQuery({
    queryKey: userProfileQueryKeys.all,
    queryFn: getAllUserProfilesAPICall,
  });

export const useDeleteUserProfile = () =>
  useMutation({
    mutationFn: (id: number) => deleteUserProfileAPICall(id),
    onSuccess: (data) => {
      toast.success(data.message || "Profile deleted successfully");
    },
  });