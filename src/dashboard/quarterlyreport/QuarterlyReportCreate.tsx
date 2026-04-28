import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCreateQuarterlyReport } from "../hooks/useQuarterlyReport";
import type { QuarterlyReportDTO } from "../types/quarterlyReport";

const schema = yup.object({
  whichYear: yup.string().required("Year is required"),
  period: yup.string().required("Period is required"),
  totalSouls: yup.string().required("Total Souls is required"),
  totalAmount: yup.string().required("Total Amount is required"),
});

const QuarterlyReportCreate: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateQuarterlyReport();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuarterlyReportDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      whichYear: "",
      period: "",
      totalSouls: "",
      totalAmount: "",
    },
  });

  const onSubmit = async (data: QuarterlyReportDTO) => {
    try {
      await createMutation.mutateAsync(data);
      setTimeout(() => navigate("/dashboard/quarterlyReportTable"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to create report"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create report");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <ToastContainer position="top-center" />

      <div className="mx-auto max-w-2xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Quarterly Report
          </p>
          <h1 className="text-2xl font-bold mt-2">Create Quarterly Report</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="text"
              placeholder="Enter year"
              {...register("whichYear")}
              className="w-full rounded-xl border px-3 py-2.5"
            />
            {errors.whichYear && (
              <p className="text-red-500 text-xs mt-1">{errors.whichYear.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Period</label>
            <input
              type="text"
              placeholder="Enter period e.g June-August"
              {...register("period")}
              className="w-full rounded-xl border px-3 py-2.5"
            />
            {errors.period && (
              <p className="text-red-500 text-xs mt-1">{errors.period.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Souls</label>
            <input
              type="text"
              placeholder="Enter total souls saved"
              {...register("totalSouls")}
              className="w-full rounded-xl border px-3 py-2.5"
            />
            {errors.totalSouls && (
              <p className="text-red-500 text-xs mt-1">{errors.totalSouls.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Amount</label>
            <input
              type="text"
              placeholder="Enter amount spent in this period"
              {...register("totalAmount")}
              className="w-full rounded-xl border px-3 py-2.5"
            />
            {errors.totalAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.totalAmount.message}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-xl bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating..." : "Create Report"}
            </button>

            <Link
              to="/dashboard/quarterlyReportTable"
              className="rounded-xl border px-5 py-2.5 text-sm font-semibold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuarterlyReportCreate;