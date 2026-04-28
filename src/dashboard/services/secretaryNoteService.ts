import { dashboardApi } from "../lib/axios";
import type {
  SecretaryNoteDTO,
  SecretaryNoteListResponse,
  SecretaryNoteResponse,
} from "../types/secretaryNote";

const BASE_PATH = "/secretaryNote";

export const createSecretaryNoteAPICall = async (
  payload: SecretaryNoteDTO
): Promise<SecretaryNoteResponse> => {
  const response = await dashboardApi.post<SecretaryNoteResponse>(
    `${BASE_PATH}/createNote`,
    payload
  );
  return response.data;
};

export const getAllSecretaryNotesAPICall = async (): Promise<SecretaryNoteListResponse> => {
  const response = await dashboardApi.get<SecretaryNoteListResponse>(
    `${BASE_PATH}/getAllNotes`
  );
  return response.data;
};

export const getSecretaryNoteAPICall = async (
  id: string
): Promise<SecretaryNoteDTO> => {
  const response = await dashboardApi.get<SecretaryNoteDTO>(
    `${BASE_PATH}/getNote/${id}`
  );
  return response.data;
};

export const updateSecretaryNoteAPICall = async (
  id: string,
  payload: Partial<SecretaryNoteDTO>
): Promise<SecretaryNoteResponse> => {
  const response = await dashboardApi.put<SecretaryNoteResponse>(
    `${BASE_PATH}/updateNote/${id}`,
    payload
  );
  return response.data;
};

export const deleteSecretaryNoteAPICall = async (
  id: string
): Promise<SecretaryNoteResponse> => {
  const response = await dashboardApi.delete<SecretaryNoteResponse>(
    `${BASE_PATH}/deleteNote/${id}`
  );
  return response.data;
};