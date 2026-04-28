import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaEye,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { exportToCsv } from "../../dashboardconference/utils/exportToCsv";
import { useDeleteSecretaryNote, useSecretaryNotes } from "../hooks/useSecretaryNote";
import type { SecretaryNoteDTO } from "../types/secretaryNote";
import { formatDisplayDateTime } from "../../dashboardconference/utils/formatters";

const truncateText = (value: string | null | undefined, max = 28): string => {
  if (!value) return "-";
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

const SecretaryNoteTable: React.FC = () => {
  const { data, isLoading } = useSecretaryNotes();
  const deleteMutation = useDeleteSecretaryNote();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());

  const notes = useMemo<SecretaryNoteDTO[]>(() => data ?? [], [data]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const reportDate = new Date(note.meetingDate);
      const reportMonthYear = `${reportDate.getMonth() + 1}/${reportDate.getFullYear()}`;

      const haystack = [
        note.meetingVenue,
        note.meetingAnchor,
        note.detailOfMeeting,
        note.actionablePointsAssigned,
        note.attendanceTotal,
        reportMonthYear,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm.toLowerCase());
    });
  }, [notes, searchTerm]);

  const currentReports = useMemo(() => {
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    return filteredNotes.slice(indexOfFirstReport, indexOfLastReport);
  }, [filteredNotes, currentPage, reportsPerPage]);

  const totalPages = Math.ceil(filteredNotes.length / reportsPerPage);

  const handleDelete = (id: string) => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this note?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await deleteMutation.mutateAsync(id);
          },
        },
        {
          label: "No",
          onClick: () => undefined,
        },
      ],
    });
  };

  const handleCheckboxChange = (id: string) => {
    const updated = new Set(selectedReports);

    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }

    setSelectedReports(updated);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReports(new Set(currentReports.map((note) => note.id!).filter(Boolean)));
    } else {
      setSelectedReports(new Set());
    }
  };

  const handleExport = (exportAll = false) => {
    const dataToExport = exportAll
      ? notes
      : notes.filter((note) => note.id && selectedReports.has(note.id));

    const rows = dataToExport.map((note) => ({
      MeetingVenue: note.meetingVenue,
      MeetingAnchor: note.meetingAnchor,
      AttendanceMen: note.attendanceMen,
      AttendanceWomen: note.attendanceWomen,
      AttendanceChildren: note.attendanceChildren,
      AttendanceTotal: note.attendanceTotal,
      DetailOfMeeting: note.detailOfMeeting,
      ActionablePoints: note.actionablePoints,
      AssignedTo: note.actionablePointsAssigned,
      MeetingDate: note.meetingDate,
      CreatedAt: note.created_at ?? "",
    }));

    exportToCsv(rows, "secretary-notes");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-slate-500">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Secretary Notes
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Meeting Minutes
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review attendance, meeting outcomes, and assigned action points from one clean record.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </Link>

            <Link
              to="/dashboard/secretaryNoteCreate"
              className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Create Note
            </Link>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
            <input
              type="text"
              placeholder="Search by venue, anchor, assigned person, month/year..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={reportsPerPage}
              onChange={(e) => {
                setReportsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              title="Notes per page"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <button
              type="button"
              onClick={() => handleExport(true)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Export All
            </button>

            <button
              type="button"
              onClick={() => handleExport(false)}
              disabled={selectedReports.size === 0}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:opacity-50 hover:bg-slate-50"
            >
              Export Selected
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm font-semibold text-slate-500">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={
                      currentReports.length > 0 &&
                      currentReports.every((note) => note.id && selectedReports.has(note.id))
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    title="Select all visible notes"
                    aria-label="Select all visible notes"
                  />
                </th>
                <th className="px-6 py-4">Meeting Summary</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">Meeting Date</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentReports.map((note, index) => {
                const summaryTitle = truncateText(note.meetingVenue, 28);
                const summarySubtitle = `${truncateText(note.meetingAnchor, 24)} • ${truncateText(
                  note.detailOfMeeting,
                  34
                )}`;

                return (
                  <tr
                    key={note.id}
                    className={`border-t border-slate-100 transition hover:bg-slate-50 ${
                      index === 0 ? "border-t-0" : ""
                    }`}
                  >
                    <td className="px-6 py-5">
                      <input
                        type="checkbox"
                        checked={note.id ? selectedReports.has(note.id) : false}
                        onChange={() => note.id && handleCheckboxChange(note.id)}
                        title={`Select note ${summaryTitle}`}
                        aria-label={`Select note ${summaryTitle}`}
                      />
                    </td>

                    <td className="px-6 py-5">
                      <div className="min-w-[340px]">
                        <p
                          className="truncate text-base font-semibold text-slate-900"
                          title={note.meetingVenue}
                        >
                          {summaryTitle}
                        </p>
                        <p className="mt-1 truncate text-sm text-slate-500" title={summarySubtitle}>
                          {summarySubtitle}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      {truncateText(note.attendanceTotal, 10)}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {formatDisplayDateTime(note.meetingDate)}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      <span title={note.actionablePointsAssigned}>
                        {truncateText(note.actionablePointsAssigned, 22)}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end">
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                          <Link
                            to={`/dashboard/secretaryNoteView/${note.id}`}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                            aria-label={`View note ${summaryTitle}`}
                            title={`View note ${summaryTitle}`}
                          >
                            <FaEye />
                          </Link>

                          <Link
                            to={`/dashboard/secretaryNoteEdit/${note.id}`}
                            className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                            aria-label={`Edit note ${summaryTitle}`}
                            title={`Edit note ${summaryTitle}`}
                          >
                            <FaEdit />
                          </Link>

                          <button
                            type="button"
                            onClick={() => note.id && handleDelete(note.id)}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                            aria-label={`Delete note ${summaryTitle}`}
                            title={`Delete note ${summaryTitle}`}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {currentReports.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    No notes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`rounded-2xl px-4 py-2 text-sm font-medium border ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-300"
                }`}
                title={`Go to page ${page}`}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default SecretaryNoteTable;