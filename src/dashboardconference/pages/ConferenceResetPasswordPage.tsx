import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { resetConferencePasswordAPICall } from "../services/conferenceManagerService";

type ResetPasswordForm = {
  password: string;
  password_confirmation: string;
};

const ConferenceResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      const response = await resetConferencePasswordAPICall({
        token,
        email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      toast.success(response.message || "Password reset successfully.");
      navigate("/dashboardconference/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to reset password."
        );
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Reset Link</h2>
          <p className="mt-3 text-slate-600">
            This password reset link is incomplete or invalid.
          </p>

          <Link
            to="/dashboardconference/forgot-password"
            className="inline-block mt-6 rounded-xl bg-blue-600 px-4 py-2 text-white font-medium"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border rounded-3xl p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Conference Manager
        </p>

        <h1 className="text-3xl font-bold mt-2">Reset Password</h1>
        <p className="text-slate-600 mt-2 break-all">
          Reset password for <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Enter new password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("password_confirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Confirm new password"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 text-white px-4 py-3 font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          <Link
            to="/dashboardconference/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConferenceResetPasswordPage;