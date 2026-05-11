import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdminLogin } from "../hooks/useConferenceManagerAuth";
import { getConferenceApiErrorMessage } from "../services/conferenceManagerService";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const adminLoginMutation = useAdminLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await adminLoginMutation.mutateAsync({
        email,
        password,
      });

      toast.success(response.message || "Admin login successful");
      navigate("/dashboardconference/admin");
    } catch (error: unknown) {
      toast.error(
        getConferenceApiErrorMessage(error, "Admin login failed. Please try again.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border rounded-3xl p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Conference Manager
        </p>
        <h2 className="text-2xl font-bold mt-2 mb-5 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-xl"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-xl"
              placeholder="Password"
            />

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showAdminPassword"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showAdminPassword" className="text-sm text-gray-700">
                Show Password
              </label>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <Link
                to="/dashboardconference/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
              <Link
                to="/dashboardconference/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Member login
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={adminLoginMutation.isPending}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {adminLoginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
