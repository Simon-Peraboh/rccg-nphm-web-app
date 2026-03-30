import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useCreateMonthlyDueReport } from "../hooks/useMonthlyDue";
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

const MonthlyDueCreate: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateMonthlyDueReport();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MonthlyDuePaymentDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: "",
      province: "",
      paymentDate: "",
      provinceCoordinator: "",
      refMonth: "",
      whoPaid: "",
      remark: "",
    },
  });

  const onSubmit = async (data: MonthlyDuePaymentDTO) => {
    try {
      await createMutation.mutateAsync(data);
      setTimeout(() => navigate("/dashboard/monthlyDueTable"), 1500);
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

      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Monthly Due Management
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Create Monthly Due Report
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Record due payments clearly and consistently across provinces and months.
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
              to="/dashboard/monthlyDueTable"
              className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Reports
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Payment Details</h2>
            <p className="mt-1 text-sm text-slate-500">
              Capture the amount, province, payment date, and reference month.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Amount Paid
                </label>
                <input
                  id="amount"
                  type="text"
                  placeholder="Enter amount paid"
                  {...register("amount")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.amount && (
                  <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="province" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Province
                </label>
                <input
                  id="province"
                  type="text"
                  placeholder="Enter province name"
                  {...register("province")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.province && (
                  <p className="mt-1 text-xs text-red-500">{errors.province.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="paymentDate" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Payment Date
                </label>
                <input
                  id="paymentDate"
                  type="date"
                  {...register("paymentDate")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.paymentDate && (
                  <p className="mt-1 text-xs text-red-500">{errors.paymentDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="refMonth" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Reference Month
                </label>
                <input
                  id="refMonth"
                  type="text"
                  placeholder="Enter month paid for"
                  {...register("refMonth")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.refMonth && (
                  <p className="mt-1 text-xs text-red-500">{errors.refMonth.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Responsible Party</h2>
            <p className="mt-1 text-sm text-slate-500">
              Record the province coordinator and optionally who made the payment.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="provinceCoordinator"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Province Coordinator
                </label>
                <input
                  id="provinceCoordinator"
                  type="text"
                  placeholder="Enter province coordinator name"
                  {...register("provinceCoordinator")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.provinceCoordinator && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.provinceCoordinator.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="whoPaid" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Who Paid
                </label>
                <input
                  id="whoPaid"
                  type="text"
                  placeholder="Who made the payment"
                  {...register("whoPaid")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label htmlFor="remark" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Remark
                </label>
                <input
                  id="remark"
                  type="text"
                  placeholder="Enter remark if any"
                  {...register("remark")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating..." : "Create Report"}
            </button>

            <Link
              to="/dashboard/monthlyDueTable"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonthlyDueCreate;