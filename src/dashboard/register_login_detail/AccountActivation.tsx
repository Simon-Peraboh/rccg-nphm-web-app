import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDashboardAccountActivation } from "../hooks/useDashboardAuth";

const AccountActivation: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const activationMutation = useDashboardAccountActivation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const t = query.get("token");

    if (t) {
      setToken(t);
    } else {
      toast.error("Invalid activation link");
      navigate("/");
    }
  }, [location.search, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await activationMutation.mutateAsync({
        token,
        temporary_password: tempPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      setTimeout(() => navigate("/dashboard/loginUser"), 2000);
    } catch (error: unknown) {
      console.error("Activation error:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Account activation failed"
        );
      } else if (error instanceof Error) {
        toast.error(error.message || "Account activation failed");
      } else {
        toast.error("Account activation failed");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-blue-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-5 text-center">Activate Your Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Temporary Password
          </label>
          <input
            type="password"
            value={tempPassword}
            onChange={(e) => setTempPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter temporary password from email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Re-enter new password"
          />
        </div>

        <button
          type="submit"
          disabled={activationMutation.isPending}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {activationMutation.isPending ? "Activating..." : "Activate Account"}
        </button>
      </form>
    </div>
  );
};

export default AccountActivation;