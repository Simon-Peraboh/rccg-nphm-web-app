import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAssistedMemberLogin, useMemberLogin } from "../hooks/useConferenceManagerAuth";
import { getConferenceApiErrorMessage } from "../services/conferenceManagerService";

type LoginMode = "code" | "passcode";

const MemberLoginPage: React.FC = () => {
  const [loginMode, setLoginMode] = useState<LoginMode>("code");
  const [firstName, setFirstName] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const memberLoginMutation = useMemberLogin();
  const assistedLoginMutation = useAssistedMemberLogin();

  const isLoggingIn = memberLoginMutation.isPending || assistedLoginMutation.isPending;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response =
        loginMode === "passcode"
          ? await assistedLoginMutation.mutateAsync({
              first_name: firstName,
              passcode,
            })
          : await memberLoginMutation.mutateAsync({
              first_name: firstName,
              registration_code: registrationCode,
              password,
            });

      toast.success(response.message || "Login successful");
      navigate("/dashboardconference/member");
    } catch (error: unknown) {
      toast.error(getConferenceApiErrorMessage(error, "Login failed. Please try again."));
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        Conference Manager
      </p>
      <h2 className="mb-5 mt-2 text-center text-2xl font-bold text-slate-950">
        Member Login
      </h2>

      <div className="mb-5 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setLoginMode("code")}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
            loginMode === "code" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"
          }`}
        >
          Code Login
        </button>
        <button
          type="button"
          onClick={() => setLoginMode("passcode")}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
            loginMode === "passcode" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"
          }`}
        >
          First Name + Passcode
        </button>
      </div>

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

        {loginMode === "code" ? (
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
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Passcode
            </label>
            <input
              type={showPassword ? "text" : "password"}
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-xl"
              placeholder="Last 6 digits of phone number"
            />
          </div>
        )}

        {loginMode === "code" && (
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
          </div>
        )}

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

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
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
