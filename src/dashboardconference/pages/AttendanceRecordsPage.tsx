import React from "react";
import axios from "axios";
import { useAttendanceRecords } from "../hooks/useConferenceManagerQueries";
import { exportToCsv } from "../utils/exportToCsv";
import { formatDisplayDate, formatDisplayDateTime } from "../utils/formatters";
import type { AttendanceRecord } from "../types/conferenceManager";

const AttendanceRecordsPage: React.FC = () => {
  const { data, isLoading, isError, error } = useAttendanceRecords();

  const records: AttendanceRecord[] = data ?? [];

  const handleExport = () => {
    const exportRows = records.map((item) => ({
      FullName: item.registration?.conference_user?.full_name ?? "",
      RegistrationCode: item.registration?.registration_code ?? "",
      ConferenceTitle: item.registration?.conference_event?.title ?? "",
      ConferenceYear: item.registration?.conference_event?.year ?? "",
      AttendanceDate: item.attendance_date ?? "",
      MarkedAt: item.marked_at ?? "",
      Status: item.status ?? "",
      ApprovedBy: item.approver?.full_name ?? "",
      ApprovedAt: item.approved_at ?? "",
      Comments: item.comments ?? "",
    }));

    exportToCsv(exportRows, "attendance-records");
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white border p-8 shadow-sm">
        <p className="text-slate-600">Loading attendance records...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl bg-white border p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-red-600">Attendance Records Error</h2>
        <p className="mt-3 text-slate-600">
          {axios.isAxiosError(error)
            ? error.response?.data?.message || "Could not load attendance records."
            : "Could not load attendance records."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Attendance Records
          </p>
          <h1 className="text-3xl font-bold mt-2">All Attendance Records</h1>
        </div>

        <button
          onClick={handleExport}
          className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="px-4">Member</th>
              <th className="px-4">Code</th>
              <th className="px-4">Conference</th>
              <th className="px-4">Attendance Date</th>
              <th className="px-4">Marked At</th>
              <th className="px-4">Status</th>
              <th className="px-4">Approved By</th>
              <th className="px-4">Approved At</th>
              <th className="px-4">Comment</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item) => (
              <tr key={item.id} className="bg-slate-50">
                <td className="px-4 py-4 rounded-l-2xl">
                  {item.registration?.conference_user?.full_name ?? "Unknown"}
                </td>
                <td className="px-4 py-4">
                  {item.registration?.registration_code ?? "-"}
                </td>
                <td className="px-4 py-4">
                  {item.registration?.conference_event?.title ?? "-"}
                </td>
                <td className="px-4 py-4">
                  {formatDisplayDate(item.attendance_date)}
                </td>
                <td className="px-4 py-4">
                  {formatDisplayDateTime(item.marked_at)}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-slate-200 text-slate-700 px-3 py-1 text-xs font-semibold">
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {item.approver?.full_name ?? "-"}
                </td>
                <td className="px-4 py-4">
                  {formatDisplayDateTime(item.approved_at)}
                </td>
                <td className="px-4 py-4 rounded-r-2xl">
                  {item.comments ?? "-"}
                </td>
              </tr>
            ))}

            {records.length === 0 && (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceRecordsPage;