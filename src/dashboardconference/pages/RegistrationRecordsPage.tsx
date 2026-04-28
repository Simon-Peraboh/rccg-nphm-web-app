import React from "react";
import axios from "axios";
import { useRegistrationRecords } from "../hooks/useConferenceManagerQueries";
import { exportToCsv } from "../utils/exportToCsv";
import { formatDisplayDate } from "../utils/formatters";
import type { RegistrationRecordItem } from "../types/conferenceManager";

const RegistrationRecordsPage: React.FC = () => {
  const { data, isLoading, isError, error } = useRegistrationRecords();

  const records: RegistrationRecordItem[] = data ?? [];

  const handleExport = () => {
    const exportRows = records.map((item) => ({
      FullName: item.conference_user?.full_name ?? "",
      Email: item.conference_user?.email ?? "",
      PhoneNumber: item.conference_user?.phone_number ?? "",
      RegistrationCode: item.registration_code ?? "",
      ConferenceTitle: item.conference_event?.title ?? "",
      ConferenceYear: item.conference_event?.year ?? "",
      Theme: item.conference_event?.theme ?? "",
      State: item.state ?? "",
      Region: item.region ?? "",
      Province: item.province ?? "",
      Position: item.position ?? "",
      Accommodation: item.accommodation ? "Yes" : "No",
      ArrivalDate: item.arrival_date ?? "",
      DepartureDate: item.departure_date ?? "",
      FirstTimer: item.first_timer ? "Yes" : "No",
      Status: item.status ?? "",
      CreatedAt: item.created_at ?? "",
    }));

    exportToCsv(exportRows, "conference-registrations");
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white border p-8 shadow-sm">
        <p className="text-slate-600">Loading registration records...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl bg-white border p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-red-600">Registration Records Error</h2>
        <p className="mt-3 text-slate-600">
          {axios.isAxiosError(error)
            ? error.response?.data?.message || "Could not load registration records."
            : "Could not load registration records."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Conference Registrations
          </p>
          <h1 className="text-3xl font-bold mt-2">All Registration Records</h1>
        </div>

        <button
          onClick={handleExport}
          className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="px-4">Member</th>
              <th className="px-4">Email</th>
              <th className="px-4">Phone</th>
              <th className="px-4">Code</th>
              <th className="px-4">Conference</th>
              <th className="px-4">Province</th>
              <th className="px-4">Position</th>
              <th className="px-4">Accommodation</th>
              <th className="px-4">Arrival</th>
              <th className="px-4">Departure</th>
              <th className="px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item) => (
              <tr key={item.id} className="bg-slate-50">
                <td className="px-4 py-4 rounded-l-2xl">
                  {item.conference_user?.full_name ?? "Unknown"}
                </td>
                <td className="px-4 py-4">{item.conference_user?.email ?? "-"}</td>
                <td className="px-4 py-4">{item.conference_user?.phone_number ?? "-"}</td>
                <td className="px-4 py-4">{item.registration_code ?? "-"}</td>
                <td className="px-4 py-4">
                  {item.conference_event?.title ?? "-"}
                </td>
                <td className="px-4 py-4">{item.province ?? "-"}</td>
                <td className="px-4 py-4">{item.position ?? "-"}</td>
                <td className="px-4 py-4">{item.accommodation ? "Yes" : "No"}</td>
                <td className="px-4 py-4">{formatDisplayDate(item.arrival_date)}</td>
                <td className="px-4 py-4">{formatDisplayDate(item.departure_date)}</td>
                <td className="px-4 py-4 rounded-r-2xl">{item.status ?? "-"}</td>
              </tr>
            ))}

            {records.length === 0 && (
              <tr>
                <td colSpan={11} className="py-10 text-center text-slate-500">
                  No registration records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationRecordsPage;