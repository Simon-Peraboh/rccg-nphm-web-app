import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createStateCoordinatorAPICall,
  getStateCoordinatorStatesAPICall,
} from "../services/stateCoordinatorService";
import type { StateCoordinatorDTO } from "../types/stateCoordinator";

export const stateCoordinatorQueryKeys = {
  states: ["state-coordinators", "states"] as const,
};

export const useStateCoordinatorStates = () =>
  useQuery({
    queryKey: stateCoordinatorQueryKeys.states,
    queryFn: getStateCoordinatorStatesAPICall,
  });

export const useCreateStateCoordinator = () =>
  useMutation({
    mutationFn: (payload: StateCoordinatorDTO) =>
      createStateCoordinatorAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Coordinator submitted successfully");
    },
  });