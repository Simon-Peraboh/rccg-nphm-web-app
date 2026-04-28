import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useApproveAttendance,
  usePendingAttendance,
  useRejectAttendance,
} from "../hooks/useConferenceManagerQueries";
import { formatDisplayDate } from "../utils/formatters";

const AdminAttendancePage: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = usePendingAttendance();

  const approveMutation = useApproveAttendance();
  const rejectMutation = useRejectAttendance();

  const handleApprove = async (id: number) => {
    try {
      await approveMutation.mutateAsync(id);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to approve attendance."
        );
      } else {
        toast.error("Unexpected error while approving attendance.");
      }
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectMutation.mutateAsync({
        id,
        comments: "Attendance rejected by admin",
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to reject attendance."
        );
      } else {
        toast.error("Unexpected error while rejecting attendance.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg">Loading pending attendance...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="max-w-xl w-full bg-white border rounded-3xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Attendance Load Error</h2>
          <p className="mt-3 text-slate-600">
            {axios.isAxiosError(error)
              ? error.response?.data?.message || "Could not load pending attendance."
              : "Could not load pending attendance."}
          </p>
        </div>
      </div>
    );
  }

  const records = data ?? [];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="px-4">Member</th>
                <th className="px-4">Code</th>
                <th className="px-4">Conference</th>
                <th className="px-4">Date</th>
                <th className="px-4">Status</th>
                <th className="px-4">Comment</th>
                <th className="px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((att) => (
                <tr key={att.id} className="bg-slate-50">
                  <td className="px-4 py-4 rounded-l-2xl">
                    {att.registration?.conference_user?.full_name ?? "Unknown"}
                  </td>

                  <td className="px-4 py-4">
                    {att.registration?.registration_code ?? "-"}
                  </td>

                  <td className="px-4 py-4">
                    {att.registration?.conference_event?.title ?? "-"}
                  </td>

                  <td className="px-4 py-4">{formatDisplayDate(att.attendance_date)}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold">
                      {att.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">{att.comments ?? "-"}</td>

                  <td className="px-4 py-4 rounded-r-2xl">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(att.id)}
                        disabled={approveMutation.isPending}
                        className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm font-medium"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(att.id)}
                        disabled={rejectMutation.isPending}
                        className="rounded-xl bg-red-600 text-white px-4 py-2 text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    No pending attendance records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendancePage;