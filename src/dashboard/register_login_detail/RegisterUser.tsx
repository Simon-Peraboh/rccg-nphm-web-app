import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaShieldAlt, FaUserPlus } from "react-icons/fa";
import { useDashboardRegister } from "../hooks/useDashboardAuth";

const roleOptions = [
  "SUPER_ADMIN",
  "ADMIN",
  "SECRETARY",
  "TREASURER",
  "USER",
];

const RegisterUser: React.FC = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const registerMutation = useDashboardRegister();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerMutation.mutateAsync({
        name,
        surname,
        email,
        role,
      });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        if (typeof responseData?.message === "object" && responseData?.message) {
          const messages = Object.values(responseData.message)
            .flat()
            .join(" ");
          toast.error(messages);
        } else {
          toast.error(responseData?.message || "Registration failed");
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error during registration");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <ToastContainer position="top-center" theme="colored" />

      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Dashboard User Management
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Register Dashboard User
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Create a new dashboard user and assign the correct access role. This is an administrative action, so accuracy matters.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <FaShieldAlt />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Administrative Access Control
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Assign roles deliberately. A sloppy role today becomes tomorrow’s production headache.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="flex items-center gap-2">
              <FaUserPlus className="text-slate-500" />
              <h2 className="text-lg font-semibold text-slate-900">User Identity</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Enter the basic details for the new dashboard user.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  First Name
                </label>
                <input
                  id="name"
                  title="First name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter first name"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label htmlFor="surname" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Surname
                </label>
                <input
                  id="surname"
                  title="Surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                  placeholder="Enter surname"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  id="email"
                  title="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter email address"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Role Assignment</h2>
            <p className="mt-1 text-sm text-slate-500">
              Select the exact permission level this user should have in the dashboard.
            </p>

            <div className="mt-5">
              <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-slate-700">
                Role
              </label>
              <select
                id="role"
                title="User role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
              >
                <option value="">Select role</option>
                {roleOptions.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-slate-500">
                Choose carefully. Role assignment controls visibility and access across the admin console.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={registerMutation.isPending}
              title="Register user"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {registerMutation.isPending ? "Registering..." : "Register User"}
            </button>

            <Link
              to="/dashboard"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;