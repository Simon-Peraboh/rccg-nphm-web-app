import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  useAdminSummary,
  useConferenceMembers,
  usePromoteConferenceMember,
} from "../hooks/useConferenceManagerQueries";
import { formatDisplayDate } from "../utils/formatters";

const AdminSummaryPage: React.FC = () => {
  const { data, isLoading, isError, error } = useAdminSummary();
  const {
    data: members = [],
    isLoading: membersLoading,
    isError: membersError,
    error: membersFetchError,
  } = useConferenceMembers();
  const promoteMutation = usePromoteConferenceMember();

  const handlePromote = async (id: number, fullName: string) => {
    try {
      await promoteMutation.mutateAsync(id);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        if (typeof responseData?.message === "string") {
          toast.error(responseData.message);
          return;
        }

        if (responseData?.message && typeof responseData.message === "object") {
          const messages = Object.values(responseData.message).flat().join(" ");
          toast.error(messages || `Failed to promote ${fullName}.`);
          return;
        }

        toast.error(responseData?.error || `Failed to promote ${fullName}.`);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(`Unexpected error while promoting ${fullName}.`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white border p-8 shadow-sm">
        <p className="text-slate-600">Loading summary...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl bg-white border p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-red-600">Summary Load Error</h2>
        <p className="mt-3 text-slate-600">
          {axios.isAxiosError(error)
            ? error.response?.data?.message || "Could not load admin summary."
            : "Could not load admin summary."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer position="top-center" theme="colored" />

      <div className="rounded-3xl bg-white border p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Admin Summary
        </p>
        <h1 className="text-3xl font-bold mt-2">
          {data?.conference?.title ?? "Conference Summary"}
        </h1>
        <p className="text-slate-600 mt-2">{data?.conference?.theme}</p>
        <p className="text-slate-500 mt-2">
          {formatDisplayDate(data?.conference?.start_date)} —{" "}
          {formatDisplayDate(data?.conference?.end_date)}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white border p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Registrations</p>
          <h3 className="text-3xl font-bold mt-2">{data?.totals?.registrations ?? 0}</h3>
        </div>

        <div className="rounded-3xl bg-white border p-6 shadow-sm">
          <p className="text-sm text-slate-500">Attendance Submitted</p>
          <h3 className="text-3xl font-bold mt-2">{data?.totals?.attendance_submitted ?? 0}</h3>
        </div>

        <div className="rounded-3xl bg-white border p-6 shadow-sm">
          <p className="text-sm text-slate-500">Attendance Approved</p>
          <h3 className="text-3xl font-bold mt-2">{data?.totals?.attendance_approved ?? 0}</h3>
        </div>

        <div className="rounded-3xl bg-white border p-6 shadow-sm">
          <p className="text-sm text-slate-500">Attendance Pending</p>
          <h3 className="text-3xl font-bold mt-2">{data?.totals?.attendance_pending ?? 0}</h3>
        </div>
      </div>

      <div className="rounded-3xl bg-white border p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Member Administration
          </p>
          <h2 className="text-2xl font-bold mt-2">Promote Members to Admin</h2>
          <p className="text-slate-500 mt-2">
            Select trusted registered members and elevate them to admin access.
          </p>
        </div>

        {membersLoading ? (
          <p className="text-slate-500">Loading members...</p>
        ) : membersError ? (
          <p className="text-red-600">
            {axios.isAxiosError(membersFetchError)
              ? membersFetchError.response?.data?.message || "Failed to load members."
              : "Failed to load members."}
          </p>
        ) : members.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-6 text-center text-slate-500">
            No members available for promotion.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b text-left text-sm text-slate-500">
                  <th className="py-3 pr-4">Full Name</th>
                  <th className="py-3 pr-4">First Name</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Phone</th>
                  <th className="py-3 pr-4">Role</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-slate-100">
                    <td className="py-4 pr-4 font-medium text-slate-900">
                      {member.full_name}
                    </td>
                    <td className="py-4 pr-4 text-slate-700">{member.first_name}</td>
                    <td className="py-4 pr-4 text-slate-700">{member.email ?? "-"}</td>
                    <td className="py-4 pr-4 text-slate-700">{member.phone_number ?? "-"}</td>
                    <td className="py-4 pr-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        type="button"
                        disabled={promoteMutation.isPending}
                        onClick={() => handlePromote(member.id, member.full_name)}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {promoteMutation.isPending ? "Promoting..." : "Promote to Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSummaryPage;