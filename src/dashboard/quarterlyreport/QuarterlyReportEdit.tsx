import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuarterlyReport, useUpdateQuarterlyReport } from "../hooks/useQuarterlyReport";
import type { QuarterlyReportDTO } from "../types/quarterlyReport";

const schema = yup.object({
  whichYear: yup.string().required("Year is required"),
  period: yup.string().required("Period is required"),
  totalSouls: yup.string().required("Souls is required"),
  totalAmount: yup.string().required("Amount is required"),
});

const QuarterlyReportEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;
  const navigate = useNavigate();

  const { data, isLoading } = useQuarterlyReport(reportId);
  const updateMutation = useUpdateQuarterlyReport();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuarterlyReportDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!data) return;

    setValue("whichYear", data.whichYear);
    setValue("period", data.period);
    setValue("totalSouls", data.totalSouls);
    setValue("totalAmount", data.totalAmount);
  }, [data, setValue]);

  const onSubmit = async (formData: QuarterlyReportDTO) => {
    try {
      await updateMutation.mutateAsync({
        id: reportId,
        payload: formData,
      });

      setTimeout(() => navigate("/dashboard/quarterlyReportTable"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to update report"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update report");
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading report...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <ToastContainer position="top-center" />

      <div className="mx-auto max-w-2xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Quarterly Report
          </p>
          <h1 className="text-2xl font-bold mt-2">Edit Quarterly Report</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="text"
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
              disabled={updateMutation.isPending}
              className="rounded-xl bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {updateMutation.isPending ? "Updating..." : "Update Report"}
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

export default QuarterlyReportEdit;