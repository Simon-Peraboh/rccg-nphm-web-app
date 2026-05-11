import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { exportToCsv } from "../../dashboardconference/utils/exportToCsv";
import { useDeleteQuarterlyReport, useQuarterlyReports } from "../hooks/useQuarterlyReport";
import type { QuarterlyReportDTO } from "../types/quarterlyReport";

const QuarterlyReportTable: React.FC = () => {
  const { data, isLoading } = useQuarterlyReports();
  const deleteMutation = useDeleteQuarterlyReport();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());

  const reports: QuarterlyReportDTO[] = data ?? [];

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const reportDate = new Date(report.creationDate ?? "");
      const reportMonthYear = `${reportDate.getMonth() + 1}/${reportDate.getFullYear()}`;
      return reportMonthYear.includes(searchTerm);
    });
  }, [reports, searchTerm]);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
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
      Year: report.whichYear,
      Period: report.period,
      TotalSouls: report.totalSouls,
      TotalAmount: report.totalAmount,
      CreationDate: report.creationDate ?? "",
    }));

    exportToCsv(rows, "quarterly-reports");
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Quarterly Report
            </p>
            <h1 className="text-2xl font-bold mt-2">Quarterly Reports</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </Link>

            <Link
              to="/dashboard/quarterlyReportCreate"
              className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium"
            >
              Create Report
            </Link>

            <button
              onClick={() => handleExport(true)}
              className="rounded-xl border px-4 py-2 text-sm font-medium"
            >
              Export All
            </button>

            <button
              onClick={() => handleExport(false)}
              disabled={selectedReports.size === 0}
              className="rounded-xl border px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              Export Selected
            </button>
          </div>
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search by Month/Year e.g. 6/2026"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl border px-4 py-3"
          />

          <select
            value={reportsPerPage}
            onChange={(e) => {
              setReportsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-xl border px-4 py-3"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="px-4"></th>
                <th className="px-4">SN</th>
                <th className="px-4">Year</th>
                <th className="px-4">Period</th>
                <th className="px-4">Total Souls</th>
                <th className="px-4">Total Amount</th>
                <th className="px-4">Date</th>
                <th className="px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentReports.map((report, index) => (
                <tr key={report.id} className="bg-slate-50">
                  <td className="px-4 py-4 rounded-l-2xl">
                    <input
                      type="checkbox"
                      checked={report.id ? selectedReports.has(report.id) : false}
                      onChange={() => report.id && handleCheckboxChange(report.id)}
                    />
                  </td>

                  <td className="px-4 py-4">{indexOfFirstReport + index + 1}</td>
                  <td className="px-4 py-4">{report.whichYear}</td>
                  <td className="px-4 py-4">{report.period}</td>
                  <td className="px-4 py-4">{report.totalSouls}</td>
                  <td className="px-4 py-4">{report.totalAmount}</td>
                  <td className="px-4 py-4">{report.creationDate ?? "-"}</td>

                  <td className="px-4 py-4 rounded-r-2xl">
                    <div className="flex gap-3 text-lg">
                      <Link
                        to={`/dashboard/quarterlyReportView/${report.id}`}
                        className="text-blue-600"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/dashboard/quarterlyReportEdit/${report.id}`}
                        className="text-green-600"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        onClick={() => report.id && handleDelete(report.id)}
                        className="text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentReports.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-500">
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
                onClick={() => setCurrentPage(page)}
                className={`rounded-xl px-4 py-2 text-sm font-medium border ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default QuarterlyReportTable;