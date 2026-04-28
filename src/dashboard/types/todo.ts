export type TodoStatus = "inProgress" | "inComplete" | "complete" | "clear";
export type TodoPriority = "urgent" | "high" | "normal" | "low" | "clear";

export interface TodoDTO {
  id?: string;
  task: string;
  description: string;
  assignee: string;
  startDate: string;
  dueDate: string;
  status: TodoStatus;
  priority: TodoPriority;
  assigned: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TodoResponse {
  message: string;
  data: TodoDTO;
}