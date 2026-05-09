import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createStateCoordinatorAPICall,
  deleteStateCoordinatorAPICall,
  getStateCoordinatorsAPICall,
  getStateCoordinatorStatesAPICall,
} from "../services/stateCoordinatorService";
import type { StateCoordinatorDTO } from "../types/stateCoordinator";

export const stateCoordinatorQueryKeys = {
  all: ["state-coordinators", "all"] as const,
  states: ["state-coordinators", "states"] as const,
};

export const useStateCoordinators = () =>
  useQuery({
    queryKey: stateCoordinatorQueryKeys.all,
    queryFn: getStateCoordinatorsAPICall,
  });

export const useStateCoordinatorStates = () =>
  useQuery({
    queryKey: stateCoordinatorQueryKeys.states,
    queryFn: getStateCoordinatorStatesAPICall,
  });

export const useCreateStateCoordinator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StateCoordinatorDTO) =>
      createStateCoordinatorAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Coordinator submitted successfully");
      queryClient.invalidateQueries({ queryKey: stateCoordinatorQueryKeys.all });
    },
  });
};

export const useDeleteStateCoordinator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteStateCoordinatorAPICall(id),
    onSuccess: (data) => {
      toast.success(data.message || "Coordinator deleted successfully");
      queryClient.invalidateQueries({ queryKey: stateCoordinatorQueryKeys.all });
    },
  });
};
