import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useMemberLogin } from "../hooks/useConferenceManagerAuth";

const MemberLoginPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const memberLoginMutation = useMemberLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await memberLoginMutation.mutateAsync({
        first_name: firstName,
        registration_code: registrationCode,
        password,
      });

      toast.success(response.message || "Login successful");
      navigate("/dashboardconference/member");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const backendMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed. Please try again.";

        toast.error(backendMessage);
      } else {
        toast.error("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl border">
      <h2 className="text-2xl font-bold mb-5 text-center">Conference Member Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-xl"
            placeholder="First Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Code</label>
          <input
            type="text"
            value={registrationCode}
            onChange={(e) => setRegistrationCode(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-xl uppercase"
            placeholder="ANB260001"
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
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700">
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
              to="/ConferenceRegistration"
              className="text-blue-600 hover:underline"
            >
              Register for Conference
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={memberLoginMutation.isPending}
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {memberLoginMutation.isPending ? "Logging in..." : "Login"}
        </button>
        <div className="text-center mt-4">
          <Link
            to="/dashboardconference/admin-login"
            className="text-sm text-blue-600 hover:underline"
          >
            Admin login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default MemberLoginPage;