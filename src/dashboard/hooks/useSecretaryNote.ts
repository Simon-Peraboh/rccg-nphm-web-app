import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createSecretaryNoteAPICall,
  deleteSecretaryNoteAPICall,
  getAllSecretaryNotesAPICall,
  getSecretaryNoteAPICall,
  updateSecretaryNoteAPICall,
} from "../services/secretaryNoteService";
import type { SecretaryNoteDTO } from "../types/secretaryNote";

export const secretaryNoteQueryKeys = {
  all: ["secretary-note", "all"] as const,
  detail: (id: string) => ["secretary-note", "detail", id] as const,
};

export const useSecretaryNotes = () =>
  useQuery({
    queryKey: secretaryNoteQueryKeys.all,
    queryFn: getAllSecretaryNotesAPICall,
  });

export const useSecretaryNote = (id?: string) =>
  useQuery({
    queryKey: secretaryNoteQueryKeys.detail(id ?? ""),
    queryFn: () => getSecretaryNoteAPICall(id as string),
    enabled: !!id,
  });

export const useCreateSecretaryNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SecretaryNoteDTO) => createSecretaryNoteAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Note created successfully");
      queryClient.invalidateQueries({ queryKey: secretaryNoteQueryKeys.all });
    },
  });
};

export const useUpdateSecretaryNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<SecretaryNoteDTO>;
    }) => updateSecretaryNoteAPICall(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Note updated successfully");
      queryClient.invalidateQueries({ queryKey: secretaryNoteQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: secretaryNoteQueryKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteSecretaryNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSecretaryNoteAPICall(id),
    onSuccess: (data) => {
      toast.success(data.message || "Note deleted successfully");
      queryClient.invalidateQueries({ queryKey: secretaryNoteQueryKeys.all });
    },
  });
};