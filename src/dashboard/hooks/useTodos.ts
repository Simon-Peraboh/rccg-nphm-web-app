import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createTodoAPICall,
  deleteTodoAPICall,
  getTodoAPICall,
  getTodosAPICall,
  updateTodoAPICall,
  updateTodoPriorityAPICall,
  updateTodoStatusAPICall,
} from "../services/todoService";
import type { TodoDTO, TodoPriority, TodoStatus } from "../types/todo";

export const todoQueryKeys = {
  all: ["todos"] as const,
  detail: (id: string) => ["todos", id] as const,
};

export const useTodos = () =>
  useQuery({
    queryKey: todoQueryKeys.all,
    queryFn: getTodosAPICall,
  });

export const useTodo = (id?: string) =>
  useQuery({
    queryKey: todoQueryKeys.detail(id ?? ""),
    queryFn: () => getTodoAPICall(id as string),
    enabled: !!id,
  });

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TodoDTO) => createTodoAPICall(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Todo created successfully");
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TodoDTO }) =>
      updateTodoAPICall(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Todo updated successfully");
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.detail(variables.id) });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodoAPICall(id),
    onSuccess: (data) => {
      toast.success(data.message || "Todo deleted successfully");
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });
};

export const useUpdateTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TodoStatus }) =>
      updateTodoStatusAPICall(id, status),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Status updated successfully");
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.detail(variables.id) });
    },
  });
};

export const useUpdateTodoPriority = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, priority }: { id: string; priority: TodoPriority }) =>
      updateTodoPriorityAPICall(id, priority),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Priority updated successfully");
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.detail(variables.id) });
    },
  });
};