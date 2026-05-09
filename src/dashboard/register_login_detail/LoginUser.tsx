import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaRegEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import { checkNetworkSpeed } from "../services/NetworkSpeedService";
import { useDashboardLogin } from "../hooks/useDashboardAuth";
import Logo from "../../assets/Images/logo1_ed3.jpg";
import HeroImage from "../../assets/Images/kirikiri_visit.jpg";

const getBackendErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    const data =
      typeof responseData === "string"
        ? (() => {
            const jsonPayload = responseData.match(/\{[\s\S]*\}\s*$/)?.[0];

            try {
              return JSON.parse(jsonPayload ?? responseData) as Record<string, unknown>;
            } catch {
              const text = responseData
                .replace(/<[^>]*>/g, " ")
                .replace(/\s+/g, " ")
                .trim();

              return text && !text.toLowerCase().includes("deprecated")
                ? { message: text }
                : {};
            }
          })()
        : responseData;

    if (data && typeof data === "object") {
      const message = (data as { message?: unknown }).message;
      const apiError = (data as { error?: unknown }).error;
      const errors = (data as { errors?: unknown }).errors;

      if (typeof message === "string" && message.trim()) return message;
      if (typeof apiError === "string" && apiError.trim()) return apiError;

      if (errors && typeof errors === "object") {
        const firstError = Object.values(errors as Record<string, unknown>)
          .flat()
          .find((value) => typeof value === "string");

        if (typeof firstError === "string" && firstError.trim()) {
          return firstError;
        }
      }
    }
  }

  if (error instanceof Error && error.message.trim()) return error.message;

  return "Unable to complete login.";
};

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

      setTimeout(() => navigate("/dashboard"), 900);
    } catch (error: unknown) {
      console.error("Login error:", error);
      toast.error(getBackendErrorMessage(error));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <ToastContainer position="top-right" theme="colored" />

      <div className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 lg:block">
          <img
            src={HeroImage}
            alt="RCCG NPHM outreach team"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/55" />

          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
            <Link to="/" className="flex w-fit items-center gap-3">
              <img
                src={Logo}
                alt="RCCG NPHM logo"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white/25"
              />
              <div>
                <p className="text-lg font-black tracking-tight text-white">
                  RCCG NPHM
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
                  Admin Console
                </p>
              </div>
            </Link>

            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                <FaShieldAlt className="h-3.5 w-3.5" />
                Secure Ministry Access
              </p>
              <h1 className="mt-5 text-5xl font-black leading-tight text-white xl:text-6xl">
                Manage reports, outreach records, and ministry operations.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-100">
                Sign in to continue coordinating national records, activities,
                reports, state data, and website content.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-3 gap-3">
              {["Reports", "People", "Outreach"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={Logo}
                  alt="RCCG NPHM logo"
                  className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div>
                  <p className="text-base font-black text-slate-950">RCCG NPHM</p>
                  <p className="text-xs font-semibold text-slate-500">
                    Dashboard Access
                  </p>
                </div>
              </Link>

              <Link
                to="/"
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-white hover:text-sky-700"
              >
                Website
              </Link>
            </div>

            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg shadow-slate-200/70 lg:hidden">
              <div className="relative h-44">
                <img
                  src={HeroImage}
                  alt="RCCG NPHM outreach team"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                    <FaShieldAlt className="h-3 w-3" />
                    Secure Access
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                  Welcome Back
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  Sign in to dashboard.
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Use your approved ministry account credentials.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="usernameOrEmail"
                    className="mb-1.5 block text-sm font-bold text-slate-700"
                  >
                    Username or Email
                  </label>
                  <div className="relative">
                    <FaRegEnvelope className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="usernameOrEmail"
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      required
                      autoComplete="username"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-slate-700"
                    >
                      Password
                    </label>
                    <Link
                      to="/dashboard/forgetPassword"
                      className="text-xs font-bold text-sky-700 transition hover:text-sky-800"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <FaLock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  <FaArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs leading-6 text-slate-500">
              Access is restricted to authorized RCCG NPHM users.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginUser;
