import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useMonthlyReport, useUpdateMonthlyReport } from "../hooks/useMonthlyReport";
import type { MonthlyReportDTO } from "../types/monthlyReport";

const schema = yup.object({
  state: yup.string().required("State is required"),
  region: yup.string().required("Region is required"),
  province: yup.string().required("Province is required"),
  coordinator_name: yup.string().required("Coordinator Name is required"),
  prison_visited: yup.string().optional(),
  hospital_visited: yup.string().optional(),
  police_station_visited: yup.string().optional(),
  others: yup.string().optional(),
  items: yup.string().required("Items are required"),
  amount_budgeted: yup.string().required("Amount Budgeted is required"),
  amount_spent: yup.string().required("Amount Spent is required"),
  team_members: yup.string().required("Team Members are required"),
  souls_won: yup.string().required("Souls Won is required"),
  challenges: yup.string().optional(),
  suggestion: yup.string().optional(),
  remarks: yup.string().optional(),
  activity_date: yup.string().required("Activity Date is required"),
  report_created_by: yup.string().required("Creator of Report is required"),
});

const MonthlyReportEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;
  const navigate = useNavigate();

  const { data, isLoading } = useMonthlyReport(reportId);
  const updateMutation = useUpdateMonthlyReport();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MonthlyReportDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!data) return;

    setValue("state", data.state);
    setValue("region", data.region);
    setValue("province", data.province);
    setValue("coordinator_name", data.coordinator_name);
    setValue("prison_visited", data.prison_visited);
    setValue("hospital_visited", data.hospital_visited);
    setValue("police_station_visited", data.police_station_visited);
    setValue("others", data.others);
    setValue("items", data.items);
    setValue("amount_budgeted", data.amount_budgeted);
    setValue("amount_spent", data.amount_spent);
    setValue("team_members", data.team_members);
    setValue("souls_won", data.souls_won);
    setValue("challenges", data.challenges);
    setValue("suggestion", data.suggestion);
    setValue("activity_date", data.activity_date);
    setValue("report_created_by", data.report_created_by);
    setValue("remarks", data.remarks || "");
  }, [data, setValue]);

  const onSubmit = async (formData: MonthlyReportDTO) => {
    try {
      await updateMutation.mutateAsync({
        id: reportId,
        payload: formData,
      });

      setTimeout(() => navigate("/dashboard/monthlyReportTable"), 1500);
    } catch (error: unknown) {
      console.error("Error updating report:", error);

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
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <ToastContainer position="top-center" />

      <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Monthly Report
          </p>
          <h1 className="text-3xl font-bold mt-2">Edit Report</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
          {[
            "state",
            "region",
            "province",
            "coordinator_name",
            "prison_visited",
            "hospital_visited",
            "police_station_visited",
            "others",
            "items",
            "amount_budgeted",
            "amount_spent",
            "team_members",
            "souls_won",
            "challenges",
            "suggestion",
            "remarks",
            "report_created_by",
          ].map((field) => (
            <div key={field} className={field === "items" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field.replace(/_/g, " ")}
              </label>

              {["others", "items", "challenges", "suggestion", "remarks"].includes(field) ? (
                <textarea
                  {...register(field as keyof MonthlyReportDTO)}
                  className="w-full rounded-xl border px-4 py-3 min-h-[110px]"
                />
              ) : (
                <input
                  type="text"
                  {...register(field as keyof MonthlyReportDTO)}
                  className="w-full rounded-xl border px-4 py-3"
                />
              )}

              {errors[field as keyof MonthlyReportDTO] && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors[field as keyof MonthlyReportDTO]?.message ?? "")}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Activity Date</label>
            <input
              type="date"
              {...register("activity_date")}
              className="w-full rounded-xl border px-4 py-3"
            />
            {errors.activity_date && (
              <p className="text-red-500 text-sm mt-1">{errors.activity_date.message}</p>
            )}
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold disabled:opacity-50"
            >
              {updateMutation.isPending ? "Updating..." : "Update Report"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/monthlyReportTable")}
              className="rounded-xl border px-6 py-3 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonthlyReportEdit;