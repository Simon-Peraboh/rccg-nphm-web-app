<<<<<<< HEAD
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createStateCoordinatorAPICall,
=======
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createStateCoordinatorAPICall,
  deleteStateCoordinatorAPICall,
  getStateCoordinatorsAPICall,
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  getStateCoordinatorStatesAPICall,
} from "../services/stateCoordinatorService";
import type { StateCoordinatorDTO } from "../types/stateCoordinator";

export const stateCoordinatorQueryKeys = {
<<<<<<< HEAD
  states: ["state-coordinators", "states"] as const,
};

=======
  all: ["state-coordinators", "all"] as const,
  states: ["state-coordinators", "states"] as const,
};

export const useStateCoordinators = () =>
  useQuery({
    queryKey: stateCoordinatorQueryKeys.all,
    queryFn: getStateCoordinatorsAPICall,
  });

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
export const useStateCoordinatorStates = () =>
  useQuery({
    queryKey: stateCoordinatorQueryKeys.states,
    queryFn: getStateCoordinatorStatesAPICall,
  });

<<<<<<< HEAD
export const useCreateStateCoordinator = () =>
  useMutation({
=======
export const useCreateStateCoordinator = () => {
  const queryClient = useQueryClient();

  return useMutation({
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
    mutationFn: (payload: StateCoordinatorDTO) =>
      createStateCoordinatorAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Coordinator submitted successfully");
<<<<<<< HEAD
    },
  });
=======
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
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
