import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNationalReport, useUpdateNationalReport } from "../hooks/useNationalReport";
import type { NationalReportDTO } from "../types/nationalReport";

const schema = yup.object({
  core_duties: yup.string().required("Core Duties is required"),
  monthly_task: yup.string().required("Monthly task is required"),
  task_done: yup.string().required("Task done is required"),
  strength: yup.string().optional(),
  weakness: yup.string().optional(),
  opportunities: yup.string().optional(),
  threats: yup.string().optional(),
  amount_budgeted: yup.string().required("Amount Budgeted is required"),
  amount_spent: yup.string().required("Amount Spent is required"),
  remarks: yup.string().optional(),
});

const NationalReportEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;
  const navigate = useNavigate();

  const { data, isLoading } = useNationalReport(reportId);
  const updateMutation = useUpdateNationalReport();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NationalReportDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!data) return;

    setValue("core_duties", data.core_duties);
    setValue("monthly_task", data.monthly_task);
    setValue("task_done", data.task_done);
    setValue("strength", data.strength);
    setValue("weakness", data.weakness);
    setValue("opportunities", data.opportunities);
    setValue("threats", data.threats);
    setValue("amount_budgeted", data.amount_budgeted);
    setValue("amount_spent", data.amount_spent);
    setValue("remarks", data.remarks || "");
  }, [data, setValue]);

  const onSubmit = async (formData: NationalReportDTO) => {
    try {
      await updateMutation.mutateAsync({
        id: reportId,
        payload: formData,
      });

      setTimeout(() => navigate("/dashboard/nationalReportTable"), 1500);
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

  const fields = [
    ["core_duties", "Core Duties"],
    ["monthly_task", "Monthly Task"],
    ["task_done", "Task Done"],
    ["strength", "Strength"],
    ["weakness", "Weakness"],
    ["opportunities", "Opportunities"],
    ["threats", "Threats"],
    ["amount_budgeted", "Amount Budgeted"],
    ["amount_spent", "Amount Spent"],
    ["remarks", "Remarks"],
  ] as const;

  if (isLoading) {
    return <div className="p-8 text-center">Loading report...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <ToastContainer position="top-center" />

      <div className="mx-auto max-w-3xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            National Report
          </p>
          <h1 className="text-2xl font-bold mt-2">Edit National Report</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
          {fields.map(([name, label]) => (
            <div key={name} className={name === "remarks" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium mb-1">{label}</label>

              {name === "remarks" ? (
                <textarea
                  {...register(name)}
                  className="w-full rounded-xl border px-3 py-2.5 min-h-[90px]"
                />
              ) : (
                <input
                  type="text"
                  {...register(name)}
                  className="w-full rounded-xl border px-3 py-2.5"
                />
              )}

              {errors[name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-xl bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {updateMutation.isPending ? "Updating..." : "Update Report"}
            </button>

            <Link
              to="/dashboard/nationalReportTable"
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

export default NationalReportEdit;