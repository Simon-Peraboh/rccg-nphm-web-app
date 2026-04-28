import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useMonthlyDueReport, useUpdateMonthlyDueReport } from "../hooks/useMonthlyDue";
import type { MonthlyDuePaymentDTO } from "../types/monthlyDue";

const schema = yup.object({
  amount: yup.string().required("Amount is required"),
  province: yup.string().required("Province is required"),
  paymentDate: yup.string().required("Payment date is required"),
  provinceCoordinator: yup.string().required("Province Coordinator Name is required"),
  refMonth: yup.string().required("Reference month is required"),
  whoPaid: yup.string().optional(),
  remark: yup.string().optional(),
});

const MonthlyDueEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;
  const navigate = useNavigate();

  const { data, isLoading } = useMonthlyDueReport(reportId);
  const updateMutation = useUpdateMonthlyDueReport();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MonthlyDuePaymentDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!data) return;

    setValue("amount", data.amount);
    setValue("province", data.province);
    setValue("paymentDate", data.paymentDate);
    setValue("provinceCoordinator", data.provinceCoordinator);
    setValue("refMonth", data.refMonth);
    setValue("whoPaid", data.whoPaid);
    setValue("remark", data.remark || "");
  }, [data, setValue]);

  const onSubmit = async (formData: MonthlyDuePaymentDTO) => {
    try {
      await updateMutation.mutateAsync({
        id: reportId,
        payload: formData,
      });

      setTimeout(() => navigate("/dashboard/monthlyDueTable"), 1500);
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
      <div className="mx-auto max-w-3xl rounded-3xl bg-white border p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Monthly Due Management
          </p>
          <h1 className="text-3xl font-bold mt-2">Edit Monthly Due Report</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Amount Paid</label>
            <input type="text" {...register("amount")} className="w-full rounded-xl border px-4 py-3" />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Province</label>
            <input type="text" {...register("province")} className="w-full rounded-xl border px-4 py-3" />
            {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Date</label>
            <input type="date" {...register("paymentDate")} className="w-full rounded-xl border px-4 py-3" />
            {errors.paymentDate && <p className="text-red-500 text-sm mt-1">{errors.paymentDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Reference Month</label>
            <input type="text" {...register("refMonth")} className="w-full rounded-xl border px-4 py-3" />
            {errors.refMonth && <p className="text-red-500 text-sm mt-1">{errors.refMonth.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Province Coordinator</label>
            <input
              type="text"
              {...register("provinceCoordinator")}
              className="w-full rounded-xl border px-4 py-3"
            />
            {errors.provinceCoordinator && (
              <p className="text-red-500 text-sm mt-1">{errors.provinceCoordinator.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Who Paid</label>
            <input type="text" {...register("whoPaid")} className="w-full rounded-xl border px-4 py-3" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Remark</label>
            <input type="text" {...register("remark")} className="w-full rounded-xl border px-4 py-3" />
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
              onClick={() => navigate("/dashboard/monthlyDueTable")}
              className="rounded-xl border px-6 py-3 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default MonthlyDueEdit;