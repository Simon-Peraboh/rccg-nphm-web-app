import axios from 'axios';
import { getToken } from './AuthServiceLoginRegister';

const BASE_URL = 'https://app.rccgphm.org/api/todoList';

axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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

export const createList = async (report: TodoListDTO) => {
  return axios.post<TodoListResponse>(`${BASE_URL}/createList`, report);
};

export const getList = async (id: string) => {
  return axios.get<TodoListDTO>(`${BASE_URL}/getList/${id}`);
};

export const getAllList = async () => {
  return axios.get<TodoListDTO[]>(`${BASE_URL}/getAllList`);
};

export const updateList = (id: string, report: TodoListDTO) => {
  return axios.put<TodoListResponse>(`${BASE_URL}/updateList/${id}`, report);
};

export const deleteList = async (id: string) => {
  return axios.delete<TodoListResponse>(`${BASE_URL}/deleteList/${id}`);
};

export const status = async (id: string, action: string) => {
  return axios.patch<TodoListResponse>(`${BASE_URL}/status/${id}`, { action });
};

export const priority = async (id: string, action: string) => {
  return axios.patch<TodoListResponse>(`${BASE_URL}/priority/${id}`, { action });
};

