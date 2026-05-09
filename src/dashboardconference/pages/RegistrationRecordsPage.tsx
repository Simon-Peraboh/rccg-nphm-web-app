<<<<<<< HEAD
import React from "react";
import axios from "axios";
=======
import React, { useMemo, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
import { useRegistrationRecords } from "../hooks/useConferenceManagerQueries";
import { exportToCsv } from "../utils/exportToCsv";
import { formatDisplayDate } from "../utils/formatters";
import type { RegistrationRecordItem } from "../types/conferenceManager";

<<<<<<< HEAD
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
=======
const toExportRow = (item: RegistrationRecordItem) => ({
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
});

const RegistrationRecordsPage: React.FC = () => {
  const { data, isLoading, isError, error } = useRegistrationRecords();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const records: RegistrationRecordItem[] = useMemo(() => data ?? [], [data]);

  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return records;

    return records.filter((item) =>
      Object.values(toExportRow(item)).join(" ").toLowerCase().includes(query)
    );
  }, [records, searchTerm]);

  const selectedRecords = useMemo(
    () => records.filter((item) => selectedIds.has(item.id)),
    [records, selectedIds]
  );

  const allFilteredSelected =
    filteredRecords.length > 0 &&
    filteredRecords.every((item) => selectedIds.has(item.id));

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const handleToggleSelectAllFiltered = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (allFilteredSelected) {
        filteredRecords.forEach((item) => next.delete(item.id));
      } else {
        filteredRecords.forEach((item) => next.add(item.id));
      }

      return next;
    });
  };

  const handleExportSelected = () => {
    const exportRows = selectedRecords.map(toExportRow);

    exportToCsv(exportRows, "conference-registrations-selected");
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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

<<<<<<< HEAD
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
=======
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search any field"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100 sm:w-72"
            />
          </div>

          <button
            onClick={handleExportSelected}
            disabled={selectedRecords.length === 0}
            className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export Selected ({selectedRecords.length})
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <p>
          Showing {filteredRecords.length} of {records.length} registrations
        </p>
        {selectedRecords.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedIds(new Set())}
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Clear selected
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1380px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="px-4">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={handleToggleSelectAllFiltered}
                  aria-label="Select all filtered registrations"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
              </th>
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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
<<<<<<< HEAD
            {records.map((item) => (
              <tr key={item.id} className="bg-slate-50">
                <td className="px-4 py-4 rounded-l-2xl">
=======
            {filteredRecords.map((item) => (
              <tr key={item.id} className="bg-slate-50">
                <td className="px-4 py-4 rounded-l-2xl">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => handleToggleSelect(item.id)}
                    aria-label={`Select ${item.conference_user?.full_name ?? "registration"}`}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  />
                </td>
                <td className="px-4 py-4">
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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

<<<<<<< HEAD
            {records.length === 0 && (
              <tr>
                <td colSpan={11} className="py-10 text-center text-slate-500">
                  No registration records found.
=======
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={12} className="py-10 text-center text-slate-500">
                  {records.length === 0
                    ? "No registration records found."
                    : "No registration records match your search."}
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default RegistrationRecordsPage;
=======
export default RegistrationRecordsPage;
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
