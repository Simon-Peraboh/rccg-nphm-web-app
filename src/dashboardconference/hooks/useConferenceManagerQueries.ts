import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  approveAttendanceAPICall,
  getActiveConferenceAPICall,
  getAttendanceRecordsAPICall,
  getDashboardAPICall,
  getMyAttendanceAPICall,
  getPendingAttendanceAPICall,
  getRegistrationRecordsAPICall,
  markAttendanceAPICall,
  rejectAttendanceAPICall,
  getAdminSummaryAPICall,
  getConferenceMembersAPICall,
  promoteConferenceMemberAPICall,
  getConferenceEventsAPICall,
  createConferenceEventAPICall,
  deleteConferenceEventAPICall,
  createConferenceActivityAPICall,
} from "../services/conferenceManagerService";

import type {
  CreateConferenceActivityDTO,
  CreateConferenceEventDTO,
} from "../types/conferenceManager";

export const conferenceQueryKeys = {
  activeConference: ["conference-manager", "active-conference"] as const,
  dashboard: ["conference-manager", "dashboard"] as const,
  myAttendance: ["conference-manager", "my-attendance"] as const,
  pendingAttendance: ["conference-manager", "admin", "pending-attendance"] as const,
  attendanceRecords: ["conference-manager", "admin", "attendance-records"] as const,
  registrations: ["conference-manager", "admin", "registrations"] as const,
  summary: ["conference-manager", "admin", "summary"] as const,
  events: ["conference-manager", "admin", "events"] as const,
  members: ["conference-manager", "admin", "members"] as const,
};

export const useActiveConference = () =>
  useQuery({
    queryKey: conferenceQueryKeys.activeConference,
    queryFn: getActiveConferenceAPICall,
  });

export const useMyAttendance = () =>
  useQuery({
    queryKey: conferenceQueryKeys.myAttendance,
    queryFn: getMyAttendanceAPICall,
    refetchInterval: 10000,
  });

export const usePendingAttendance = () =>
  useQuery({
    queryKey: conferenceQueryKeys.pendingAttendance,
    queryFn: getPendingAttendanceAPICall,
    refetchInterval: 10000,
  });

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAttendanceAPICall,
    onSuccess: async (data) => {
      toast.success(data?.message || "Attendance submitted successfully");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.dashboard }),
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.myAttendance }),
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.pendingAttendance }),
      ]);
    },
  });
};

export const useApproveAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => approveAttendanceAPICall(id),
    onSuccess: async (data) => {
      toast.success(data?.message || "Attendance approved successfully");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.pendingAttendance }),
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.dashboard }),
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.myAttendance }),
      ]);
    },
  });
};

export const useRejectAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, comments }: { id: number; comments?: string }) =>
      rejectAttendanceAPICall(id, comments),
    onSuccess: async (data) => {
      toast.success(data?.message || "Attendance rejected successfully");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.pendingAttendance }),
      ]);
    },
  });
};

export const useConferenceEvents = () =>
  useQuery({
    queryKey: conferenceQueryKeys.events,
    queryFn: getConferenceEventsAPICall,
  });

export const useCreateConferenceEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateConferenceEventDTO) =>
      createConferenceEventAPICall(payload),
    onSuccess: async (data) => {
      toast.success(data.message || "Conference event created successfully");
      await queryClient.invalidateQueries({
        queryKey: conferenceQueryKeys.events,
      });
      await queryClient.invalidateQueries({
        queryKey: conferenceQueryKeys.activeConference,
      });
    },
  });
};

export const useDeleteConferenceEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteConferenceEventAPICall(id),
    onSuccess: async (data) => {
      toast.success(data.message || "Conference event deleted successfully.");
      await queryClient.invalidateQueries({
        queryKey: conferenceQueryKeys.events,
      });
      await queryClient.invalidateQueries({
        queryKey: conferenceQueryKeys.activeConference,
      });
    },
  });
};

export const useCreateConferenceActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conferenceEventId,
      payload,
    }: {
      conferenceEventId: number;
      payload: CreateConferenceActivityDTO;
    }) => createConferenceActivityAPICall(conferenceEventId, payload),
    onSuccess: async (data) => {
      toast.success(data.message || "Conference activity created successfully");
      await queryClient.invalidateQueries({
        queryKey: conferenceQueryKeys.events,
      });
      await queryClient.invalidateQueries({
        queryKey: conferenceQueryKeys.activeConference,
      });
      await queryClient.invalidateQueries({
        queryKey: conferenceQueryKeys.dashboard,
      });
    },
  });
};

export const useRegistrationRecords = () =>
  useQuery({
    queryKey: conferenceQueryKeys.registrations,
    queryFn: getRegistrationRecordsAPICall,
  });

export const useAttendanceRecords = () =>
  useQuery({
    queryKey: conferenceQueryKeys.attendanceRecords,
    queryFn: getAttendanceRecordsAPICall,
  });

export const useAdminSummary = () =>
  useQuery({
    queryKey: conferenceQueryKeys.summary,
    queryFn: getAdminSummaryAPICall,
    refetchInterval: 10000,
  });

export const useDashboard = () =>
  useQuery({
    queryKey: conferenceQueryKeys.dashboard,
    queryFn: getDashboardAPICall,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  export const useConferenceMembers = () =>
  useQuery({
    queryKey: conferenceQueryKeys.members,
    queryFn: getConferenceMembersAPICall,
  });

export const usePromoteConferenceMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => promoteConferenceMemberAPICall(id),
    onSuccess: async (data) => {
      toast.success(data?.message || "User promoted to admin successfully");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.members }),
        queryClient.invalidateQueries({ queryKey: conferenceQueryKeys.summary }),
      ]);
    },
  });
};