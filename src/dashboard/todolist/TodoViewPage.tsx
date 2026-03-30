import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../hooks/useTodos";

const DetailRow: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
  <div className="rounded-2xl border bg-slate-50 p-4">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-semibold text-slate-900">{value || "-"}</p>
  </div>
);

const TodoViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: todo, isLoading } = useTodo(id);

  if (isLoading) {
    return <div className="p-8 text-center">Loading task...</div>;
  }

  if (!todo) {
    return <div className="p-8 text-center">Task not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Details</h1>
          <div className="flex gap-3">
            <Link
              to={`/dashboard/todos/${todo.id}`}
              className="rounded-xl bg-green-600 px-4 py-2 text-white text-sm font-semibold"
            >
              Edit
            </Link>
            <button
              onClick={() => navigate("/dashboard/todoListTable")}
              className="rounded-xl border px-4 py-2 text-sm font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DetailRow label="Task" value={todo.task} />
          <DetailRow label="Assignee" value={todo.assignee} />
          <DetailRow label="Start Date" value={todo.start_date} />
          <DetailRow label="Due Date" value={todo.due_date} />
          <DetailRow label="Status" value={todo.status} />
          <DetailRow label="Priority" value={todo.priority} />
          <DetailRow label="Assigned" value={todo.assigned ? "Yes" : "No"} />
          <div className="md:col-span-2">
            <DetailRow label="Description" value={todo.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoViewPage;