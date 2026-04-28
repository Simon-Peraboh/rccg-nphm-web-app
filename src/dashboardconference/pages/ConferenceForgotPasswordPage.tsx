import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { forgotConferencePasswordAPICall } from "../services/conferenceManagerService";

type ForgotPasswordForm = {
  email: string;
};

const ConferenceForgotPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const response = await forgotConferencePasswordAPICall(data);
      toast.success(response.message || "Password reset link sent successfully.");
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to send password reset link."
        );
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border rounded-3xl p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Conference Manager
        </p>

        <h1 className="text-3xl font-bold mt-2">Forgot Password</h1>
        <p className="text-slate-600 mt-2">
          Enter the email used for conference registration. We will send you a password reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 text-white px-4 py-3 font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm">
          <Link
            to="/dashboardconference/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>

          <Link
            to="/ConferenceRegistration"
            className="text-blue-600 hover:underline"
          >
            Register for Conference
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConferenceForgotPasswordPage;