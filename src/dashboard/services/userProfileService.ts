import { dashboardApi } from "../../dashboard/lib/axios";
import type { UserProfileDTO, UserProfileResponse } from "../types/userProfile";

const BASE_PATH = "/userProfile";

const toFormData = (payload: UserProfileDTO): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === "image_path" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "image_path") {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
};

export const getRegionsAPICall = async (): Promise<string[]> => {
  const response = await dashboardApi.get<string[]>(`${BASE_PATH}/regions`);
  return response.data;
};

export const getStatesAPICall = async (): Promise<string[]> => {
  const response = await dashboardApi.get<string[]>(`${BASE_PATH}/states`);
  return response.data;
};

export const getProvincesAPICall = async (region: string): Promise<string[]> => {
  const response = await dashboardApi.get<string[]>(`${BASE_PATH}/provinces/${region}`);
  return response.data;
};

export const getLgasAPICall = async (state: string): Promise<string[]> => {
  const response = await dashboardApi.get<string[]>(`${BASE_PATH}/lgas/${state}`);
  return response.data;
};

export const createUserProfileAPICall = async (
  payload: UserProfileDTO
): Promise<UserProfileResponse> => {
  const response = await dashboardApi.post<UserProfileResponse>(
    `${BASE_PATH}/createUser`,
    toFormData(payload),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getUserProfileAPICall = async (id: string): Promise<UserProfileDTO> => {
  const response = await dashboardApi.get<UserProfileDTO>(`${BASE_PATH}/getUser/${id}`);
  return response.data;
};

export const updateUserProfileAPICall = async (
  id: number,
  payload: UserProfileDTO
): Promise<UserProfileResponse> => {
  const formData = toFormData(payload);
  formData.append("_method", "PUT");

  const response = await dashboardApi.post<UserProfileResponse>(
    `${BASE_PATH}/updateUser/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getAllUserProfilesAPICall = async (): Promise<UserProfileDTO[]> => {
  const response = await dashboardApi.get<UserProfileDTO[]>(`${BASE_PATH}/getAllUsers`);
  return response.data;
};

export const deleteUserProfileAPICall = async (
  id: number
): Promise<{ message: string }> => {
  const response = await dashboardApi.delete<{ message: string }>(
    `${BASE_PATH}/deleteUser/${id}`
  );
  return response.data;
};