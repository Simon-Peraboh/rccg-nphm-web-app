import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer } from "react-toastify";
import {
  FaArrowLeft,
  FaEdit,
  FaEye,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import {
  useDeleteTodo,
  useTodos,
  useUpdateTodoPriority,
  useUpdateTodoStatus,
} from "../hooks/useTodos";
import type { TodoPriority, TodoStatus, TodoDTO } from "../types/todo";
import { formatDisplayDateTime } from "../../dashboardconference/utils/formatters";

const truncateText = (value: string | null | undefined, max = 32): string => {
  if (!value) return "-";
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

const TodoTablePage: React.FC = () => {
  const { data, isLoading } = useTodos();
  const deleteMutation = useDeleteTodo();
  const statusMutation = useUpdateTodoStatus();
  const priorityMutation = useUpdateTodoPriority();

  const [searchTerm, setSearchTerm] = useState("");

  const todos = useMemo<TodoDTO[]>(() => data ?? [], [data]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const haystack = [
        todo.task,
        todo.description,
        todo.assignee,
        todo.status,
        todo.priority,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm.toLowerCase());
    });
  }, [todos, searchTerm]);

  const handleDelete = (id: string, task: string) => {
    confirmAlert({
      title: "Confirm delete",
      message: `Are you sure you want to delete "${task}"?`,
      buttons: [
        { label: "Yes", onClick: async () => deleteMutation.mutateAsync(id) },
        { label: "No", onClick: () => undefined },
      ],
    });
  };

  const handleStatusChange = async (id: string, status: TodoStatus) => {
    await statusMutation.mutateAsync({ id, status });
  };

  const handlePriorityChange = async (id: string, priority: TodoPriority) => {
    await priorityMutation.mutateAsync({ id, priority });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-slate-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Task Management
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Todo Board
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage assignments, due dates, status, and priority from one command center.
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
              to="/dashboard/todoListCreate"
              className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add New Task
            </Link>
          </div>
        </div>

        <div className="mb-5 relative max-w-md">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
          <input
            type="text"
            placeholder="Search by task, assignee, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200">
          <table className="w-full min-w-[1280px] border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm font-semibold text-slate-500">
                <th className="px-6 py-4">Task</th>
                <th className="px-6 py-4">Assignee</th>
                <th className="px-6 py-4">Start</th>
                <th className="px-6 py-4">Due</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Assigned</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTodos.map((todo, index) => (
                <tr
                  key={todo.id}
                  className={`border-t border-slate-100 transition hover:bg-slate-50 ${
                    index === 0 ? "border-t-0" : ""
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="min-w-[320px]">
                      <p
                        className="truncate text-base font-semibold text-slate-900"
                        title={todo.task}
                      >
                        {truncateText(todo.task, 34)}
                      </p>
                      <p
                        className="mt-1 truncate text-sm text-slate-500"
                        title={todo.description}
                      >
                        {truncateText(todo.description, 48)}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-700">
                    {truncateText(todo.assignee, 22)}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-500">
                    {formatDisplayDateTime(todo.startDate)}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-500">
                    {formatDisplayDateTime(todo.dueDate)}
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={todo.status}
                      onChange={(e) =>
                        handleStatusChange(todo.id as string, e.target.value as TodoStatus)
                      }
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                      title={`Update status for ${todo.task}`}
                    >
                      <option value="inComplete">Incomplete</option>
                      <option value="inProgress">In Progress</option>
                      <option value="complete">Complete</option>
                      <option value="clear">Clear</option>
                    </select>
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={todo.priority}
                      onChange={(e) =>
                        handlePriorityChange(todo.id as string, e.target.value as TodoPriority)
                      }
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                      title={`Update priority for ${todo.task}`}
                    >
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="normal">Normal</option>
                      <option value="low">Low</option>
                      <option value="clear">Clear</option>
                    </select>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {todo.assigned ? "Yes" : "No"}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end">
                      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                        <Link
                          to={`/dashboard/todoListView/${todo.id}`}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                          aria-label={`View ${todo.task}`}
                          title={`View ${todo.task}`}
                        >
                          <FaEye />
                        </Link>

                        <Link
                          to={`/dashboard/todoListEdit/${todo.id}`}
                          className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                          aria-label={`Edit ${todo.task}`}
                          title={`Edit ${todo.task}`}
                        >
                          <FaEdit />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(todo.id as string, todo.task)}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                          aria-label={`Delete ${todo.task}`}
                          title={`Delete ${todo.task}`}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredTodos.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-slate-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoTablePage;
