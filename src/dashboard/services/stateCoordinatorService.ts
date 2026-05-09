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
<<<<<<< HEAD
      if (key === "image_path" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "image_path") {
=======
      if (key === "image_path") {
        if (value instanceof Blob) {
          formData.append(
            key,
            value,
            value instanceof File ? value.name : "coordinator-image.jpg"
          );
        }
      } else {
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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

<<<<<<< HEAD
=======
export const getStateCoordinatorsAPICall = async (): Promise<StateCoordinatorDTO[]> => {
  const response = await dashboardApi.get<StateCoordinatorDTO[]>(
    `${BASE_PATH}/admin/all`
  );

  return Array.isArray(response.data) ? response.data : [];
};

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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
<<<<<<< HEAD
};
=======
};

export const deleteStateCoordinatorAPICall = async (
  id: number
): Promise<{ message: string }> => {
  const response = await dashboardApi.delete<{ message: string }>(
    `${BASE_PATH}/deleteUser/${id}`
  );

  return response.data;
};
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
