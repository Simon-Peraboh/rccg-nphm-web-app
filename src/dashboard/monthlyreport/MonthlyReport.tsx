import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import {
  useCreateMonthlyReport,
  useMonthlyReportProvinces,
  useMonthlyReportRegions,
} from "../hooks/useMonthlyReport";
import type { MonthlyReportDTO } from "../types/monthlyReport";

const charLimits: Record<string, number> = {
  challenges: 150,
  suggestion: 150,
  remarks: 150,
  others: 100,
  coordinator_name: 60,
  items: 255,
};

const initialForm: MonthlyReportDTO = {
  state: "",
  region: "",
  province: "",
  coordinator_name: "",
  prison_visited: "",
  hospital_visited: "",
  police_station_visited: "",
  others: "",
  items: "",
  amount_budgeted: "",
  amount_spent: "",
  team_members: "",
  souls_won: "",
  challenges: "",
  suggestion: "",
  remarks: "",
  report_created_by: "",
  activity_date: "",
};

const fieldLabels: Record<keyof MonthlyReportDTO, string> = {
  id: "ID",
  state: "State",
  region: "Region",
  province: "Province",
  coordinator_name: "Coordinator Name",
  prison_visited: "Prison Visited",
  hospital_visited: "Hospital Visited",
  police_station_visited: "Police Station Visited",
  others: "Other Places Visited",
  items: "Items",
  amount_budgeted: "Amount Budgeted",
  amount_spent: "Amount Spent",
  team_members: "Team Members",
  souls_won: "Souls Won",
  challenges: "Challenges",
  suggestion: "Suggestion",
  remarks: "Remarks",
  report_created_by: "Report Created By",
  activity_date: "Activity Date",
};

const textareaFields = ["challenges", "suggestion", "remarks", "others", "items"];

const MonthlyReportCreate: React.FC = () => {
  const [form, setForm] = useState<MonthlyReportDTO>(initialForm);
  const [reviewMode, setReviewMode] = useState(false);

  const navigate = useNavigate();
  const createMutation = useCreateMonthlyReport();

  const { data: regions = [] } = useMonthlyReportRegions();
  const { data: provinces = [] } = useMonthlyReportProvinces(form.region);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (charLimits[name] && value.length > charLimits[name]) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "region" ? { province: "" } : {}),
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewMode(true);
  };

  const onConfirmSubmit = async () => {
    try {
      await createMutation.mutateAsync(form);
      setTimeout(() => navigate("/dashboard/monthlyReportTable"), 1500);
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to submit report."
        : "An unexpected error occurred.";

      toast.error(message);
    }
  };

  const renderField = (
    name: keyof MonthlyReportDTO,
    placeholder: string,
    className = ""
  ) => {
    const value = (form[name] as string) ?? "";
    const isTextarea = textareaFields.includes(name);
    const isOptional = ["others", "challenges", "suggestion", "remarks"].includes(name);
    const limit = charLimits[name];
    const remaining = limit ? limit - value.length : null;

    return (
      <div key={name} className={className}>
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
          {fieldLabels[name]}
        </label>

        {isTextarea ? (
          <div className="relative">
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onInputChange}
              required={!isOptional}
              className="min-h-[96px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-16 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
            />
            {limit && (
              <span
                className={`pointer-events-none absolute bottom-3 right-4 text-[11px] ${
                  remaining !== null && remaining < 20 ? "text-red-500" : "text-slate-400"
                }`}
              >
                {remaining}
              </span>
            )}
          </div>
        ) : (
          <div className="relative">
            <input
              id={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onInputChange}
              required={!isOptional}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
            />
            {limit && (
              <span
                className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] ${
                  remaining !== null && remaining < 20 ? "text-red-500" : "text-slate-400"
                }`}
              >
                {remaining}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-7xl">
        {reviewMode ? (
          <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Monthly Report
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Review Submission
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Confirm the details before sending the report.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {Object.entries(form).map(([key, val]) => (
                <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    {key.replace(/_/g, " ")}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {val || "-"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() => setReviewMode(false)}
              >
                Edit
              </button>

              <button
                type="button"
                className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50 hover:bg-green-700"
                onClick={onConfirmSubmit}
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Submitting..." : "Submit Report"}
              </button>

              <Link
                to="/dashboard/monthlyReportTable"
                className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
              >
                Cancel
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                  Monthly Report
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  Create Monthly Report
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Capture field visitation, expenditure, outreach impact, and observations.
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

                <Link
                  to="/dashboard/monthlyReportTable"
                  className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View Reports
                </Link>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                <h3 className="text-lg font-semibold text-slate-900">Location & Leadership</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Record the location and responsible coordinator for this report.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="region" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Region
                    </label>
                    <select
                      id="region"
                      name="region"
                      value={form.region}
                      onChange={onInputChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
                      required
                      title="Region"
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="province" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Province
                    </label>
                    <select
                      id="province"
                      name="province"
                      value={form.province}
                      onChange={onInputChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
                      required
                      title="Province"
                    >
                      <option value="">Select Province</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>

                  {renderField("state", "Enter your state")}
                  {renderField("coordinator_name", "Enter coordinator name")}
                  {renderField("report_created_by", "Enter your name")}
                  <div>
                    <label htmlFor="activity_date" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Activity Date
                    </label>
                    <input
                      id="activity_date"
                      type="date"
                      name="activity_date"
                      value={form.activity_date}
                      onChange={onInputChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                <h3 className="text-lg font-semibold text-slate-900">Visitation & Outreach</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Capture places visited, team strength, outreach items, and souls won.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {renderField("prison_visited", "Enter prison visited")}
                  {renderField("hospital_visited", "Enter hospital visited")}
                  {renderField("police_station_visited", "Enter police station visited")}
                  {renderField("team_members", "Total number who went")}
                  {renderField("souls_won", "Souls won e.g. 5")}
                  {renderField("others", "Other places visited")}
                  {renderField("items", "Items e.g. Rice, Garri", "md:col-span-2")}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                <h3 className="text-lg font-semibold text-slate-900">Financials & Observations</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Record financial performance and notable field observations.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {renderField("amount_budgeted", "Enter budgeted amount")}
                  {renderField("amount_spent", "Enter actual amount spent")}
                  {renderField("challenges", "Challenges faced if any")}
                  {renderField("suggestion", "Any suggestions?")}
                  {renderField("remarks", "Any remarks", "md:col-span-2")}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Review
                </button>

                <Link
                  to="/dashboard/monthlyReportTable"
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyReportCreate;
