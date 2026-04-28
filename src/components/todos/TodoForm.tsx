import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { TodoDTO } from "../../dashboard/types/todo";

interface TodoFormProps {
  onSubmit: SubmitHandler<TodoDTO>;
  todo?: TodoDTO | null;
  isSubmitting?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, todo, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TodoDTO>({
    defaultValues: todo ?? {
      task: "",
      description: "",
      assignee: "",
      startDate: "",
      dueDate: "",
      status: "inComplete",
      priority: "normal",
      assigned: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium mb-1">Task</label>
        <input
          type="text"
          {...register("task", { required: "Task is required" })}
          className="w-full rounded-xl border px-3 py-2.5"
        />
        {errors.task && <p className="text-red-500 text-xs mt-1">{errors.task.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Assignee</label>
        <input
          type="text"
          {...register("assignee", { required: "Assignee is required" })}
          className="w-full rounded-xl border px-3 py-2.5"
        />
        {errors.assignee && <p className="text-red-500 text-xs mt-1">{errors.assignee.message}</p>}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full rounded-xl border px-3 py-2.5 min-h-[100px]"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          type="date"
          {...register("startDate", { required: "Start date is required" })}
          className="w-full rounded-xl border px-3 py-2.5"
        />
        {errors.startDate && (
          <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="date"
          {...register("dueDate", { required: "Due date is required" })}
          className="w-full rounded-xl border px-3 py-2.5"
        />
        {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select {...register("status")} className="w-full rounded-xl border px-3 py-2.5">
          <option value="inComplete">Incomplete</option>
          <option value="inProgress">In Progress</option>
          <option value="complete">Complete</option>
          <option value="clear">Clear</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select {...register("priority")} className="w-full rounded-xl border px-3 py-2.5">
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
          <option value="clear">Clear</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="inline-flex items-center gap-3">
          <input type="checkbox" {...register("assigned")} />
          <span className="text-sm font-medium">Assigned</span>
        </label>
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Task"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;