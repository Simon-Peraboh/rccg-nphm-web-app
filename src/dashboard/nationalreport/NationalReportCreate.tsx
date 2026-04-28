import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useCreateNationalReport } from "../hooks/useNationalReport";
import type { NationalReportDTO } from "../types/nationalReport";

const schema = yup.object({
  core_duties: yup.string().required("Core Duties is required"),
  monthly_task: yup.string().required("Monthly task is required"),
  task_done: yup.string().required("Task Done is required"),
  strength: yup.string().optional(),
  weakness: yup.string().optional(),
  opportunities: yup.string().optional(),
  threats: yup.string().optional(),
  amount_budgeted: yup.string().required("Amount Budgeted is required"),
  amount_spent: yup.string().required("Amount Spent is required"),
  remarks: yup.string().optional(),
});

const NationalReportCreate: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateNationalReport();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NationalReportDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      core_duties: "",
      monthly_task: "",
      task_done: "",
      strength: "",
      weakness: "",
      opportunities: "",
      threats: "",
      amount_budgeted: "",
      amount_spent: "",
      remarks: "",
    },
  });

  const onSubmit = async (data: NationalReportDTO) => {
    try {
      await createMutation.mutateAsync(data);
      setTimeout(() => navigate("/dashboard/nationalReportTable"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        let message = "Failed to create report";

        if (typeof responseData?.message === "string") {
          message = responseData.message;
        } else if (typeof responseData?.errors === "object" && responseData?.errors) {
          message = Object.values(responseData.errors).flat().join(" ");
        }

        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              National Report
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Create National Report
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Record national-level execution, SWOT observations, and expenditure.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </Link>

            <Link
              to="/dashboard/nationalReportTable"
              className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Reports
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Execution Summary</h2>
            <p className="mt-1 text-sm text-slate-500">
              Capture the core work, monthly assignment, and what was actually executed.
            </p>

            <div className="mt-5 grid gap-5">
              <div>
                <label htmlFor="core_duties" className="mb-1 block text-sm font-medium text-slate-700">
                  Core Duties
                </label>
                <input
                  id="core_duties"
                  type="text"
                  {...register("core_duties")}
                  placeholder="Enter core duties"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
                {errors.core_duties && (
                  <p className="mt-1 text-xs text-red-500">{errors.core_duties.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="monthly_task" className="mb-1 block text-sm font-medium text-slate-700">
                  Monthly Task
                </label>
                <input
                  id="monthly_task"
                  type="text"
                  {...register("monthly_task")}
                  placeholder="Enter monthly task"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
                {errors.monthly_task && (
                  <p className="mt-1 text-xs text-red-500">{errors.monthly_task.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="task_done" className="mb-1 block text-sm font-medium text-slate-700">
                  Task Done
                </label>
                <textarea
                  id="task_done"
                  {...register("task_done")}
                  placeholder="Describe the work completed"
                  className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
                {errors.task_done && (
                  <p className="mt-1 text-xs text-red-500">{errors.task_done.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">SWOT Review</h2>
            <p className="mt-1 text-sm text-slate-500">
              Highlight strengths, weaknesses, opportunities, and threats.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="strength" className="mb-1 block text-sm font-medium text-slate-700">
                  Strength
                </label>
                <textarea
                  id="strength"
                  {...register("strength")}
                  placeholder="Enter area of strength"
                  className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label htmlFor="weakness" className="mb-1 block text-sm font-medium text-slate-700">
                  Weakness
                </label>
                <textarea
                  id="weakness"
                  {...register("weakness")}
                  placeholder="Enter area of weakness"
                  className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label htmlFor="opportunities" className="mb-1 block text-sm font-medium text-slate-700">
                  Opportunities
                </label>
                <textarea
                  id="opportunities"
                  {...register("opportunities")}
                  placeholder="Enter opportunities if any"
                  className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label htmlFor="threats" className="mb-1 block text-sm font-medium text-slate-700">
                  Threats
                </label>
                <textarea
                  id="threats"
                  {...register("threats")}
                  placeholder="Enter threats if any"
                  className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Financial Summary</h2>
            <p className="mt-1 text-sm text-slate-500">
              Compare planned budget against actual spending.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="amount_budgeted" className="mb-1 block text-sm font-medium text-slate-700">
                  Amount Budgeted
                </label>
                <input
                  id="amount_budgeted"
                  type="text"
                  {...register("amount_budgeted")}
                  placeholder="Enter amount budgeted"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
                {errors.amount_budgeted && (
                  <p className="mt-1 text-xs text-red-500">{errors.amount_budgeted.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="amount_spent" className="mb-1 block text-sm font-medium text-slate-700">
                  Amount Spent
                </label>
                <input
                  id="amount_spent"
                  type="text"
                  {...register("amount_spent")}
                  placeholder="Enter amount spent"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
                {errors.amount_spent && (
                  <p className="mt-1 text-xs text-red-500">{errors.amount_spent.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Remarks</h2>
            <p className="mt-1 text-sm text-slate-500">
              Add closing observations or important context.
            </p>

            <div className="mt-5">
              <label htmlFor="remarks" className="mb-1 block text-sm font-medium text-slate-700">
                Remarks
              </label>
              <textarea
                id="remarks"
                {...register("remarks")}
                placeholder="Enter remarks if any"
                className="min-h-[110px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating..." : "Create Report"}
            </button>

            <Link
              to="/dashboard/nationalReportTable"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NationalReportCreate;