import { dashboardApi } from "../lib/axios";
import type {
  StateCoordinatorDTO,
  StateCoordinatorResponse,
} from "../types/stateCoordinator";

const BASE_PATH = "/stateCoordinators";

type StateCoordinatorListResponse =
  | StateCoordinatorDTO[]
  | { data?: StateCoordinatorDTO[] };

const toFormData = (payload: StateCoordinatorDTO): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === "image_path") {
        if (value instanceof Blob) {
          formData.append(
            key,
            value,
            value instanceof File ? value.name : "coordinator-image.jpg"
          );
        }
      } else {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
};

export const getStateCoordinatorStatesAPICall = async (): Promise<string[]> => {
  const response = await dashboardApi.get<string[]>(`${BASE_PATH}/states`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getStateCoordinatorsAPICall = async (): Promise<StateCoordinatorDTO[]> => {
  const response = await dashboardApi.get<StateCoordinatorListResponse>(
    `${BASE_PATH}/admin/all`
  );

  if (Array.isArray(response.data)) return response.data;
  if (response.data && Array.isArray(response.data.data)) return response.data.data;
  return [];
};

export const createStateCoordinatorAPICall = async (
  payload: StateCoordinatorDTO
): Promise<StateCoordinatorResponse> => {
  const response = await dashboardApi.post<StateCoordinatorResponse>(
    `${BASE_PATH}/create`,
    toFormData(payload),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteStateCoordinatorAPICall = async (
  id: number
): Promise<{ message: string }> => {
  const response = await dashboardApi.delete<{ message: string }>(
    `${BASE_PATH}/deleteUser/${id}`
  );

  return response.data;
};
