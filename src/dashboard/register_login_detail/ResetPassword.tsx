import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDashboardResetPassword } from "../hooks/useDashboardAuth";

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData?.message === "string") return responseData.message;

    if (responseData?.message && typeof responseData.message === "object") {
      const firstMessage = Object.values(responseData.message).flat().find(Boolean);
      if (typeof firstMessage === "string") return firstMessage;
    }

    if (typeof responseData?.error === "string") return responseData.error;
  }

  if (error instanceof Error) return error.message;
  return "Password reset failed";
};

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordMutation = useDashboardResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link.");
      navigate("/dashboard/forgetPassword");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        password,
        password_confirmation: confirmPassword,
      });

      setTimeout(() => {
        navigate("/dashboard/loginUser");
      }, 2000);
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-blue-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="New password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Confirm password"
          />
        </div>

        <button
          type="submit"
          disabled={resetPasswordMutation.isPending}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <div className="text-center mt-4">
        <Link
          to="/dashboard/loginUser"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default ResetPassword;