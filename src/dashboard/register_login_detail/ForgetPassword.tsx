import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDashboardForgotPassword } from "../hooks/useDashboardAuth";

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
  return "Failed to send reset link";
};

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useDashboardForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await forgotPasswordMutation.mutateAsync({ email });
      setEmail("");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-blue-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your email address and we’ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={forgotPasswordMutation.isPending}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;