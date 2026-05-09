import React, { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useDashboard,
  useMarkAttendance,
} from "../hooks/useConferenceManagerQueries";
import type { ConferenceActivity } from "../types/conferenceManager";
import { useConferenceLogout } from '../hooks/useConferenceManagerAuth';
<<<<<<< HEAD
import { useNavigate } from "react-router";
import { formatDisplayDate } from "../utils/formatters";
=======
import { Link, useNavigate } from "react-router-dom";
import { formatDisplayDate } from "../utils/formatters";
import { FaArrowLeft, FaDownload, FaFileAlt } from "react-icons/fa";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

const statusBadge = (status?: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-amber-100 text-amber-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

<<<<<<< HEAD
=======
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const DEFAULT_ACTIVITY_DOCUMENT_URL =
  "/documents/RMF_2026_CONVENTION_PROGRAM_OUTLINE.pdf";
const DEFAULT_ACTIVITY_DOCUMENT_NAME = "RMF 2026 Convention Program Outline";

const normalizeDocumentUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  const path = value
    .trim()
    .replace(/^\/+/, "")
    .replace(/^public\//, "")
    .replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${path}`;
};

const getActivityDocumentUrl = (activity: ConferenceActivity) =>
  normalizeDocumentUrl(
    activity.documentUrl ??
      activity.document_url ??
      activity.documentPath ??
      activity.document_path ??
      ""
  ) || DEFAULT_ACTIVITY_DOCUMENT_URL;

const getActivityDocumentName = (activity: ConferenceActivity) =>
  activity.documentName ??
  activity.document_name ??
  DEFAULT_ACTIVITY_DOCUMENT_NAME;

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
const MemberDashboardPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const { data, isLoading, isError, error } = useDashboard();
  const markAttendanceMutation = useMarkAttendance();

  const activitiesByDay = useMemo(() => {
    const grouped = new Map<number, ConferenceActivity[]>();
    const activities = data?.activities ?? [];

    activities.forEach((activity) => {
      if (!grouped.has(activity.day_number)) {
        grouped.set(activity.day_number, []);
      }
      grouped.get(activity.day_number)!.push(activity);
    });

    return grouped;
  }, [data?.activities]);

  const navigate = useNavigate();
  const logoutMutation = useConferenceLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/dashboardconference/login");
    } catch {
      navigate("/dashboardconference/login");
    }
  };

  const dayTabs = Array.from(activitiesByDay.keys()).sort((a, b) => a - b);

  const handleMarkAttendance = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      await markAttendanceMutation.mutateAsync({
        attendance_date: today,
        comments: "Present physically",
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to submit attendance."
        );
      } else {
        toast.error("Unexpected error while submitting attendance.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="max-w-xl w-full bg-white border rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Dashboard Error</h2>
          <p className="mt-3 text-slate-600">
            {axios.isAxiosError(error)
              ? error.response?.data?.message || "Could not load dashboard."
              : "Could not load dashboard."}
          </p>
        </div>
      </div>
    );
  }

  const latestAttendance = data.current_attendance?.[0];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <section className="rounded-[28px] bg-gradient-to-r from-slate-900 to-blue-900 text-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-200">
            Conference Manager
          </p>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome, {data.user.first_name}
              </h1>

              <p className="mt-2 text-slate-200">
                {data.active_conference?.title} — {data.active_conference?.theme}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
<<<<<<< HEAD
=======
              {data.user.role === "admin" && (
                <Link
                  to="/dashboardconference/admin"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-slate-900"
                >
                  <FaArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              )}

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
              <button
                onClick={handleMarkAttendance}
                disabled={markAttendanceMutation.isPending || !data.current_registration}
                className="rounded-2xl bg-white text-slate-900 px-5 py-3 font-semibold disabled:opacity-50"
              >
                {markAttendanceMutation.isPending ? "Submitting..." : "Mark Attendance"}
              </button>

              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="rounded-2xl border border-white/40 bg-transparent text-white px-5 py-3 font-semibold disabled:opacity-50"
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white border p-6">
            <p className="text-sm text-slate-500">
              Current Registration Code
            </p>
            <h3 className="text-2xl font-bold mt-2">
              {data.current_registration?.registration_code ?? "Not Registered"}
            </h3>
          </div>

          <div className="rounded-3xl bg-white border p-6">
            <p className="text-sm text-slate-500">
              Conference Year
            </p>
            <h3 className="text-2xl font-bold mt-2">
              {data.active_conference?.year ?? "-"}
            </h3>
          </div>

          <div className="rounded-3xl bg-white border p-6">
            <p className="text-sm text-slate-500">
              Attendance Status
            </p>

            <div className="mt-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusBadge(
                  latestAttendance?.status
                )}`}
              >
                {latestAttendance?.status ?? "No record yet"}
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-white border p-6">
            <p className="text-sm text-slate-500">
              First Timer
            </p>
            <h3 className="text-2xl font-bold mt-2">
              {data.current_registration?.first_timer ? "Yes" : "No"}
            </h3>
          </div>

        </section>

        {/* MAIN GRID */}
        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">

          {/* ACTIVITIES */}
          <div className="rounded-3xl bg-white border p-6">

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                  Program Schedule
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  Conference Activities
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {dayTabs.length > 0 ? (
                  dayTabs.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium border ${selectedDay === day
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-700"
                        }`}
                    >
                      Day {day}
                    </button>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">
                    No activities yet
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">

              {(activitiesByDay.get(selectedDay) ?? []).map((activity) => (

                <div
                  key={activity.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                    <div>
                      <h3 className="font-semibold text-lg">
                        {activity.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {formatDisplayDate(activity.activity_date)} • {activity.start_time} - {activity.end_time}
                      </p>

                      {activity.description && (
                        <p className="text-sm text-slate-600 mt-3">
                          {activity.description}
                        </p>
                      )}
<<<<<<< HEAD
=======

                      {getActivityDocumentUrl(activity) && (
                        <a
                          href={getActivityDocumentUrl(activity)}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                        >
                          <FaFileAlt />
                          {getActivityDocumentName(activity)}
                          <FaDownload />
                        </a>
                      )}
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
                    </div>

                    <div className="text-sm text-slate-600">

                      {activity.location && (
                        <p>
                          <strong>Venue:</strong> {activity.location}
                        </p>
                      )}

                      {activity.facilitator && (
                        <p>
                          <strong>Facilitator:</strong> {activity.facilitator}
                        </p>
                      )}

                    </div>
                  </div>
                </div>

              ))}

              {dayTabs.length === 0 && (
                <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">
                  No activities have been added yet.
                </div>
              )}

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* CURRENT REGISTRATION */}
            <div className="rounded-3xl bg-white border p-6">

              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Current Registration
              </p>

              <div className="mt-4 space-y-3 text-sm text-slate-700">

                <p>
                  <strong>Province:</strong> {data.current_registration?.province ?? "-"}
                </p>

                <p>
                  <strong>Region:</strong> {data.current_registration?.region ?? "-"}
                </p>

                <p>
                  <strong>Position:</strong> {data.current_registration?.position ?? "-"}
                </p>

                <p>
                  <strong>Accommodation:</strong> {data.current_registration?.accommodation ? "Yes" : "No"}
                </p>

                <p>
                  <strong>Arrival:</strong> {formatDisplayDate(data.current_registration?.arrival_date) ?? "-"}
                </p>

                <p>
                  <strong>Departure:</strong> {formatDisplayDate(data.current_registration?.departure_date) ?? "-"}
                </p>

              </div>
            </div>

            {/* HISTORY */}
            <div className="rounded-3xl bg-white border p-6">

              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Previous Records
              </p>

              <div className="mt-4 space-y-4 max-h-[420px] overflow-y-auto pr-1">

                {(data.history ?? []).map((item) => {

                  const attendanceRecords = item.attendanceRecords ?? [];

                  return (

                    <div key={item.id} className="rounded-2xl bg-slate-50 p-4 border">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <h4 className="font-semibold">
                            {item.conferenceEvent?.title} ({item.conferenceEvent?.year})
                          </h4>

                          <p className="text-sm text-slate-500">
                            {item.conferenceEvent?.theme}
                          </p>

                          <p className="text-sm mt-2">
                            <strong>Code:</strong> {item.registration_code}
                          </p>
                        </div>

                        <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                          {item.status}
                        </span>

                      </div>

                      <div className="mt-3">

                        <p className="text-sm font-medium text-slate-700">
                          Attendance
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">

                          {attendanceRecords.length > 0 ? (

                            attendanceRecords.map((att) => (

                              <span
                                key={att.id}
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(att.status)}`}
                              >
                                {att.attendance_date} • {att.status}
                              </span>

                            ))

                          ) : (

                            <span className="text-sm text-slate-500">
                              No attendance record
                            </span>

                          )}

                        </div>

                      </div>

                    </div>

                  );
                })}

                {(data.history ?? []).length === 0 && (

                  <div className="rounded-2xl border border-dashed p-6 text-center text-slate-500">
                    No previous records found.
                  </div>

                )}

              </div>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

export default MemberDashboardPage;

