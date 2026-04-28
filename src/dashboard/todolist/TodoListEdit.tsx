import React from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../../components/todos/TodoForm";
import { useTodo, useUpdateTodo } from "../hooks/useTodos";
import type { TodoDTO } from "../types/todo";

const TodoEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: todo, isLoading } = useTodo(id);
  const updateMutation = useUpdateTodo();

  const handleUpdate = async (data: TodoDTO) => {
    await updateMutation.mutateAsync({
      id: id as string,
      payload: data,
    });

    setTimeout(() => navigate("/dashboard/todos"), 1200);
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading task...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <ToastContainer position="top-right" />
      <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
        <TodoForm onSubmit={handleUpdate} todo={todo} isSubmitting={updateMutation.isPending} />
      </div>
    </div>
  );
};

export default TodoEditPage;