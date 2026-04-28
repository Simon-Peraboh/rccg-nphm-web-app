import React from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TodoForm from "../../components/todos/TodoForm";
import { useCreateTodo } from "../hooks/useTodos";
import type { TodoDTO } from "../types/todo";

const TodoCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateTodo();

  const handleCreate = async (data: TodoDTO) => {
    await createMutation.mutateAsync(data);
    setTimeout(() => navigate("/dashboard/todoListTable"), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Task Management
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Create Todo
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Add a task, assign ownership, define urgency, and track delivery dates.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </Link>

            <Link
              to="/dashboard/todoListEdit"
              className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Tasks
            </Link>
          </div>
        </div>

        <TodoForm
          onSubmit={handleCreate}
          todo={null}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
};

export default TodoCreatePage;