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
import { useDeleteNationalReport, useNationalReports } from "../hooks/useNationalReport";
import type { NationalReportDTO } from "../types/nationalReport";
import { formatDisplayDateTime } from "../../dashboardconference/utils/formatters";

const truncateText = (value: string | null | undefined, max = 28): string => {
  if (!value) return "-";
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

const NationalReportTable: React.FC = () => {
  const { data, isLoading } = useNationalReports();
  const deleteMutation = useDeleteNationalReport();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());

  const reports = useMemo<NationalReportDTO[]>(() => data ?? [], [data]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const reportDate = new Date(report.created_at ?? "");
      const reportMonthYear = `${reportDate.getMonth() + 1}/${reportDate.getFullYear()}`;

      const haystack = [
        report.core_duties,
        report.monthly_task,
        report.task_done,
        report.strength,
        report.weakness,
        report.opportunities,
        report.threats,
        report.amount_budgeted,
        report.amount_spent,
        report.remarks,
        reportMonthYear,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm.toLowerCase());
    });
  }, [reports, searchTerm]);

  const currentReports = useMemo(() => {
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    return filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  }, [filteredReports, currentPage, reportsPerPage]);

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handleDelete = (id: string) => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this report?",
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

  const handleExport = (exportAll = false) => {
    const dataToExport = exportAll
      ? reports
      : reports.filter((report) => report.id && selectedReports.has(report.id));

    const rows = dataToExport.map((report) => ({
      CoreDuties: report.core_duties,
      MonthlyTask: report.monthly_task,
      TaskDone: report.task_done,
      Strength: report.strength ?? "",
      Weakness: report.weakness ?? "",
      Opportunities: report.opportunities ?? "",
      Threats: report.threats ?? "",
      AmountBudgeted: report.amount_budgeted,
      AmountSpent: report.amount_spent,
      Remarks: report.remarks ?? "",
      CreatedAt: report.created_at ?? "",
    }));

    exportToCsv(rows, "national-reports");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-slate-500">Loading reports...</p>
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
              National Report
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              National Reports
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track national performance, SWOT insights, and expenditure in one place.
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
              to="/dashboard/nationalReportCreate"
              className="inline-flex items-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Create Report
            </Link>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
            <input
              type="text"
              placeholder="Search by task, SWOT, month/year..."
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
              title="Reports per page"
              value={reportsPerPage}
              onChange={(e) => {
                setReportsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
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

            <div className="text-sm text-slate-500">
              {filteredReports.length} record{filteredReports.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm font-semibold text-slate-500">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    title="Select all visible reports"
                    aria-label="Select all visible reports"
                    checked={
                      currentReports.length > 0 &&
                      currentReports.every((report) => report.id && selectedReports.has(report.id))
                    }
                    onChange={(e) => {
                      const updated = new Set(selectedReports);

                      if (e.target.checked) {
                        currentReports.forEach((report) => {
                          if (report.id) updated.add(report.id);
                        });
                      } else {
                        currentReports.forEach((report) => {
                          if (report.id) updated.delete(report.id);
                        });
                      }

                      setSelectedReports(updated);
                    }}
                  />
                </th>
                <th className="px-6 py-4">Report Summary</th>
                <th className="px-6 py-4">Budgeted</th>
                <th className="px-6 py-4">Spent</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentReports.map((report, index) => {
                const summaryTitle = truncateText(report.core_duties, 34);
                const summarySubtitle = truncateText(report.monthly_task, 40);

                return (
                  <tr
                    key={report.id}
                    className={`border-t border-slate-100 transition hover:bg-slate-50 ${
                      index === 0 ? "border-t-0" : ""
                    }`}
                  >
                    <td className="px-6 py-5">
                      <input
                        type="checkbox"
                        title={`Select report ${summaryTitle}`}
                        aria-label={`Select report ${summaryTitle}`}
                        checked={report.id ? selectedReports.has(report.id) : false}
                        onChange={() => report.id && handleCheckboxChange(report.id)}
                      />
                    </td>

                    <td className="px-6 py-5">
                      <div className="min-w-[320px]">
                        <p
                          className="truncate text-base font-semibold text-slate-900"
                          title={report.core_duties}
                        >
                          {summaryTitle}
                        </p>
                        <p
                          className="mt-1 truncate text-sm text-slate-500"
                          title={report.monthly_task}
                        >
                          {summarySubtitle}
                        </p>
                        <p
                          className="mt-1 truncate text-xs text-slate-400"
                          title={report.task_done}
                        >
                          {truncateText(report.task_done, 46)}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {truncateText(report.amount_budgeted, 18)}
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-700">
                      {truncateText(report.amount_spent, 18)}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {formatDisplayDateTime(report.created_at) ?? "-"}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end">
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                          <Link
                            to={`/dashboard/nationalReportView/${report.id}`}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                            aria-label={`View report ${summaryTitle}`}
                            title={`View report ${summaryTitle}`}
                          >
                            <FaEye />
                          </Link>

                          <Link
                            to={`/dashboard/nationalReportEdit/${report.id}`}
                            className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                            aria-label={`Edit report ${summaryTitle}`}
                            title={`Edit report ${summaryTitle}`}
                          >
                            <FaEdit />
                          </Link>

                          <button
                            type="button"
                            onClick={() => report.id && handleDelete(report.id)}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                            aria-label={`Delete report ${summaryTitle}`}
                            title={`Delete report ${summaryTitle}`}
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
                    No reports found.
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
                title={`Go to page ${page}`}
                aria-label={`Go to page ${page}`}
                onClick={() => setCurrentPage(page)}
                className={`rounded-2xl px-4 py-2 text-sm font-medium border ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-300"
                }`}
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

export default NationalReportTable;