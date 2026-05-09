import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "../lib/queryClient";
import {
  adminLoginAPICall,
  assistedMemberLoginAPICall,
  createAdminAPICall,
  logoutConferenceAPICall,
  memberLoginAPICall,
  registerConferenceAPICall,
} from "../services/conferenceManagerService";
import {
  clearConferenceSession,
  saveConferenceUser,
  storeConferenceToken,
} from "../services/conferenceManagerStorage";
import type {
  AdminLoginDTO,
  AssistedMemberLoginDTO,
  CreateAdminDTO,
  MemberLoginDTO,
  RegisterConferenceDTO,
} from "../types/conferenceManager";

export const useRegisterConference = () =>
  useMutation({
    mutationFn: (payload: RegisterConferenceDTO) =>
      registerConferenceAPICall(payload),
  });

export const useMemberLogin = () =>
  useMutation({
    mutationFn: (payload: MemberLoginDTO) => memberLoginAPICall(payload),
    onSuccess: (data) => {
      storeConferenceToken(data.token);
      saveConferenceUser(data.user);
    },
  });

export const useAssistedMemberLogin = () =>
  useMutation({
    mutationFn: (payload: AssistedMemberLoginDTO) => assistedMemberLoginAPICall(payload),
    onSuccess: (data) => {
      storeConferenceToken(data.token);
      saveConferenceUser(data.user);
    },
  });

export const useAdminLogin = () =>
  useMutation({
    mutationFn: (payload: AdminLoginDTO) => adminLoginAPICall(payload),
    onSuccess: (data) => {
      storeConferenceToken(data.token);
      saveConferenceUser(data.user);
    },
  });

export const useConferenceLogout = () =>
  useMutation({
    mutationFn: logoutConferenceAPICall,
    onSettled: async () => {
      clearConferenceSession();
      queryClient.clear();
      toast.success("Logged out successfully");
    },
  });

export const useCreateAdmin = () =>
  useMutation({
    mutationFn: (payload: CreateAdminDTO) => createAdminAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Admin created successfully");
    },
  });
