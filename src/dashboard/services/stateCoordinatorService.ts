import { dashboardApi } from "../lib/axios";
import type {
  StateCoordinatorDTO,
  StateCoordinatorResponse,
} from "../types/stateCoordinator";

const BASE_PATH = "/stateCoordinators";

const toFormData = (payload: StateCoordinatorDTO): FormData => {
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

export const getStateCoordinatorStatesAPICall = async (): Promise<string[]> => {
  const response = await dashboardApi.get<string[]>(`${BASE_PATH}/states`);
  return Array.isArray(response.data) ? response.data : [];
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