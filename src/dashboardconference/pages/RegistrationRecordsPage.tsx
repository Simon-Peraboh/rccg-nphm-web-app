import React, { useMemo, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useBulkAssistedRegistration,
  useRegistrationRecords,
} from "../hooks/useConferenceManagerQueries";
import { getConferenceApiErrorMessage } from "../services/conferenceManagerService";
import { exportToCsv } from "../utils/exportToCsv";
import { formatDisplayDate } from "../utils/formatters";
import type {
  BulkAssistedRegistrationResponse,
  BulkAssistedRegistrationRow,
  RegistrationRecordItem,
} from "../types/conferenceManager";

type SheetRow = Record<string, unknown>;

const normalizeHeader = (header: string) =>
  header.toLowerCase().replace(/[^a-z0-9]/g, "");

const getSheetValue = (row: SheetRow, aliases: string[]) => {
  const normalizedRow = Object.entries(row).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      acc[normalizeHeader(key)] = value;
      return acc;
    },
    {}
  );

  for (const alias of aliases) {
    const value = normalizedRow[normalizeHeader(alias)];

    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }

  return "";
};

const getSheetText = (row: SheetRow, aliases: string[]) =>
  String(getSheetValue(row, aliases)).trim();

const getSheetBoolean = (row: SheetRow, aliases: string[]) => {
  const value = getSheetValue(row, aliases);

  if (typeof value === "boolean") return value;

  const text = String(value).trim().toLowerCase();

  return ["1", "true", "yes", "y"].includes(text);
};

const getSheetDate = (row: SheetRow, aliases: string[]) => {
  const text = getSheetText(row, aliases);

  if (!text) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);

  const parsedDate = new Date(text);

  return Number.isNaN(parsedDate.getTime())
    ? null
    : parsedDate.toISOString().slice(0, 10);
};

const parseAssistedRegistrationRows = async (
  file: File
): Promise<BulkAssistedRegistrationRow[]> => {
  const workbook = XLSX.read(await file.arrayBuffer(), {
    type: "array",
    raw: false,
    cellDates: true,
  });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    return [];
  }

  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<SheetRow>(sheet, { defval: "", raw: false });

  return rows
    .map((row) => ({
      full_name: getSheetText(row, ["full name", "fullname", "name", "member name"]),
      phone_number: getSheetText(row, [
        "phone number",
        "phone",
        "phone no",
        "phone no.",
        "mobile",
        "mobile number",
      ]),
      state: getSheetText(row, ["state"]),
      region: getSheetText(row, ["region"]),
      province: getSheetText(row, ["province"]),
      position: getSheetText(row, ["position", "office", "role"]) || "Member",
      accommodation: getSheetBoolean(row, ["accommodation", "needs accommodation"]),
      arrival_date: getSheetDate(row, ["arrival date", "arrival"]),
      departure_date: getSheetDate(row, ["departure date", "departure"]),
      first_timer: getSheetBoolean(row, ["first timer", "first time", "first_timer"]),
    }))
    .filter((row) =>
      [
        row.full_name,
        row.phone_number,
        row.state,
        row.region,
        row.province,
      ].some(Boolean)
    );
};

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
  const bulkAssistedMutation = useBulkAssistedRegistration();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkFileName, setBulkFileName] = useState("");
  const [bulkRows, setBulkRows] = useState<BulkAssistedRegistrationRow[]>([]);
  const [bulkResults, setBulkResults] =
    useState<BulkAssistedRegistrationResponse | null>(null);

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

  const invalidBulkRows = useMemo(
    () =>
      bulkRows.filter(
        (row) =>
          !row.full_name ||
          !row.phone_number ||
          !row.state ||
          !row.region ||
          !row.province
      ),
    [bulkRows]
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
  };

  const handleBulkFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const rows = await parseAssistedRegistrationRows(file);

      setBulkFileName(file.name);
      setBulkRows(rows);
      setBulkResults(null);

      if (rows.length === 0) {
        toast.warning("No registration rows were found in the selected file.");
      } else {
        toast.success(`${rows.length} registration row${rows.length === 1 ? "" : "s"} loaded.`);
      }
    } catch {
      setBulkFileName("");
      setBulkRows([]);
      setBulkResults(null);
      toast.error("Could not read the selected Excel file.");
    } finally {
      event.target.value = "";
    }
  };

  const handleBulkSubmit = async () => {
    if (bulkRows.length === 0) {
      toast.error("Please choose an Excel file first.");
      return;
    }

    if (invalidBulkRows.length > 0) {
      toast.error("Some rows are missing full name, phone number, state, region, or province.");
      return;
    }

    try {
      const response = await bulkAssistedMutation.mutateAsync(bulkRows);
      setBulkResults(response);
    } catch (error: unknown) {
      toast.error(
        getConferenceApiErrorMessage(error, "Could not process assisted registrations.")
      );
    }
  };

  const handleExportBulkResults = () => {
    if (!bulkResults) return;

    exportToCsv(
      bulkResults.data.map((item) => ({
        Row: item.row,
        Status: item.status,
        FullName: item.full_name,
        FirstName: item.first_name ?? "",
        PhoneNumber: item.phone_number ?? "",
        Passcode: item.passcode ?? "",
        RegistrationCode: item.registration_code ?? "",
        Message: item.message,
      })),
      "conference-assisted-registration-passcodes"
    );
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

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#bulk-upload"
            className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          >
            Bulk User Upload
          </a>

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

      <div id="bulk-upload" className="mb-6 scroll-mt-6 border-y border-slate-200 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Assisted Registration
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">
              Bulk user upload for members without email
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Required columns: Full Name, Phone Number, State, Region, Province.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Choose Excel
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleBulkFileChange}
                className="sr-only"
              />
            </label>

            <button
              type="button"
              onClick={handleBulkSubmit}
              disabled={bulkRows.length === 0 || bulkAssistedMutation.isPending}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {bulkAssistedMutation.isPending ? "Processing..." : "Process Upload"}
            </button>
          </div>
        </div>

        {bulkRows.length > 0 && (
          <div className="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
              <p>
                {bulkFileName} loaded with {bulkRows.length} row
                {bulkRows.length === 1 ? "" : "s"}.
              </p>
              <p className={invalidBulkRows.length ? "font-semibold text-red-600" : "text-green-700"}>
                {invalidBulkRows.length
                  ? `${invalidBulkRows.length} row${invalidBulkRows.length === 1 ? "" : "s"} need required fields`
                  : "All preview rows have required fields"}
              </p>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="px-3">Name</th>
                    <th className="px-3">Phone</th>
                    <th className="px-3">State</th>
                    <th className="px-3">Region</th>
                    <th className="px-3">Province</th>
                    <th className="px-3">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkRows.slice(0, 6).map((row, index) => (
                    <tr key={`${row.phone_number}-${index}`} className="bg-slate-50">
                      <td className="rounded-l-xl px-3 py-3">{row.full_name || "-"}</td>
                      <td className="px-3 py-3">{row.phone_number || "-"}</td>
                      <td className="px-3 py-3">{row.state || "-"}</td>
                      <td className="px-3 py-3">{row.region || "-"}</td>
                      <td className="px-3 py-3">{row.province || "-"}</td>
                      <td className="rounded-r-xl px-3 py-3">{row.position || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {bulkResults && (
          <div className="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="grid gap-3 text-sm sm:grid-cols-4">
                <span className="rounded-xl bg-slate-100 px-3 py-2">
                  Total: {bulkResults.summary.total}
                </span>
                <span className="rounded-xl bg-green-50 px-3 py-2 text-green-700">
                  Created: {bulkResults.summary.created}
                </span>
                <span className="rounded-xl bg-blue-50 px-3 py-2 text-blue-700">
                  Registered: {bulkResults.summary.registered}
                </span>
                <span className="rounded-xl bg-red-50 px-3 py-2 text-red-700">
                  Failed: {bulkResults.summary.failed}
                </span>
              </div>

              <button
                type="button"
                onClick={handleExportBulkResults}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Export Passcodes
              </button>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="px-3">Row</th>
                    <th className="px-3">Status</th>
                    <th className="px-3">Name</th>
                    <th className="px-3">First Name</th>
                    <th className="px-3">Phone</th>
                    <th className="px-3">Passcode</th>
                    <th className="px-3">Code</th>
                    <th className="px-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkResults.data.map((item) => (
                    <tr key={`${item.row}-${item.phone_number}`} className="bg-slate-50">
                      <td className="rounded-l-xl px-3 py-3">{item.row}</td>
                      <td className="px-3 py-3 capitalize">{item.status}</td>
                      <td className="px-3 py-3">{item.full_name}</td>
                      <td className="px-3 py-3">{item.first_name ?? "-"}</td>
                      <td className="px-3 py-3">{item.phone_number ?? "-"}</td>
                      <td className="px-3 py-3 font-semibold">{item.passcode ?? "-"}</td>
                      <td className="px-3 py-3">{item.registration_code ?? "-"}</td>
                      <td className="rounded-r-xl px-3 py-3">{item.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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

            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={12} className="py-10 text-center text-slate-500">
                  {records.length === 0
                    ? "No registration records found."
                    : "No registration records match your search."}
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
