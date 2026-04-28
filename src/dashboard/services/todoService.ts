import { dashboardApi } from "../lib/axios";
import type { TodoDTO, TodoPriority, TodoResponse, TodoStatus } from "../types/todo";

const BASE_PATH = "/todoList";

const toApiPayload = (todo: TodoDTO) => ({
  task: todo.task,
  description: todo.description,
  assignee: todo.assignee,
  start_date: todo.startDate,
  due_date: todo.dueDate,
  status: todo.status,
  priority: todo.priority,
  assigned: todo.assigned,
});

const fromApiTodo = (data: Record<string, unknown>): TodoDTO => ({
  id: String(data.id ?? ""),
  task: String(data.task ?? ""),
  description: String(data.description ?? ""),
  assignee: String(data.assignee ?? ""),
  startDate: String(data.start_date ?? ""),
  dueDate: String(data.due_date ?? ""),
  status: (data.status as TodoStatus) ?? "inComplete",
  priority: (data.priority as TodoPriority) ?? "normal",
  assigned: Boolean(data.assigned),
  created_at: data.created_at ? String(data.created_at) : undefined,
  updated_at: data.updated_at ? String(data.updated_at) : undefined,
});

export const getTodosAPICall = async (): Promise<TodoDTO[]> => {
  const response = await dashboardApi.get<Record<string, unknown>[]>(BASE_PATH);
  return response.data.map(fromApiTodo);
};

export const getTodoAPICall = async (id: string): Promise<TodoDTO> => {
  const response = await dashboardApi.get<Record<string, unknown>>(`${BASE_PATH}/${id}`);
  return fromApiTodo(response.data);
};

export const createTodoAPICall = async (payload: TodoDTO): Promise<TodoResponse> => {
  const response = await dashboardApi.post<TodoResponse>(BASE_PATH, toApiPayload(payload));
  return {
    ...response.data,
    data: fromApiTodo(response.data.data as unknown as Record<string, unknown>),
  };
};

export const updateTodoAPICall = async (
  id: string,
  payload: TodoDTO
): Promise<TodoResponse> => {
  const response = await dashboardApi.put<TodoResponse>(`${BASE_PATH}/${id}`, toApiPayload(payload));
  return {
    ...response.data,
    data: fromApiTodo(response.data.data as unknown as Record<string, unknown>),
  };
};

export const deleteTodoAPICall = async (id: string): Promise<{ message: string }> => {
  const response = await dashboardApi.delete<{ message: string }>(`${BASE_PATH}/${id}`);
  return response.data;
};

export const updateTodoStatusAPICall = async (
  id: string,
  status: TodoStatus
): Promise<TodoResponse> => {
  const response = await dashboardApi.patch<TodoResponse>(`${BASE_PATH}/${id}/status`, {
    status,
  });
  return {
    ...response.data,
    data: fromApiTodo(response.data.data as unknown as Record<string, unknown>),
  };
};

export const updateTodoPriorityAPICall = async (
  id: string,
  priority: TodoPriority
): Promise<TodoResponse> => {
  const response = await dashboardApi.patch<TodoResponse>(`${BASE_PATH}/${id}/priority`, {
    priority,
  });
  return {
    ...response.data,
    data: fromApiTodo(response.data.data as unknown as Record<string, unknown>),
  };
};