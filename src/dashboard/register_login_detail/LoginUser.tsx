import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { checkNetworkSpeed } from "../services/NetworkSpeedService";
import { Link } from "react-router-dom";
import { useDashboardLogin } from "../hooks/useDashboardAuth";

const LoginUser: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const loginMutation = useDashboardLogin();

  useEffect(() => {
    checkNetworkSpeed();

    const interval = setInterval(checkNetworkSpeed, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync({
        usernameOrEmail,
        password,
      });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error: unknown) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        const backendMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed. Please try again.";

        toast.error(backendMessage);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-blue-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username or Email
          </label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Username or Email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Password"
          />

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700">
              Show Password
            </label>
          </div>

          <div className="text-right mt-2">
            <Link
              to="/dashboard/forgetPassword"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default LoginUser;