import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';

const BASE_URL = 'https://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/todoList';

axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

export interface TodoListDTO {
  id?: string;
  task: string;
  description: string;
  assignee: string;
  startDate: string;
  dueDate: string;
  status: string;
  priority: string;
  assigned: string;
}

export interface TodoListResponse {
  message: string;
  todoListDTO?: TodoListDTO;
}

export const createReport = async (report: TodoListDTO) => {
  return axios.post<TodoListResponse>(`${BASE_URL}`, report);
};

export const getProjectById = async (id: string) => {
  return axios.get<TodoListDTO>(`${BASE_URL}/${id}`);
};

export const getReports = async () => {
  return axios.get<TodoListDTO[]>(`${BASE_URL}`);
};

export const updateReport = (id: string, report: TodoListDTO) => {
  return axios.put<TodoListResponse>(`${BASE_URL}/${id}`, report);
};

export const deleteReport = async (id: string) => {
  return axios.delete<TodoListResponse>(`${BASE_URL}/${id}`);
};

export const updateTodoStatus = async (id: string, action: string) => {
  return axios.patch<TodoListResponse>(`${BASE_URL}/${id}/status`, { action });
};

export const updateTodoPriority = async (id: string, action: string) => {
  return axios.patch<TodoListResponse>(`${BASE_URL}/${id}/priority`, { action });
};
