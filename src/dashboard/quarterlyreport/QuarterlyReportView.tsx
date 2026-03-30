import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuarterlyReport } from "../hooks/useQuarterlyReport";

const DetailRow: React.FC<{ label: string; value?: string | null }> = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border bg-slate-50 p-4">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-semibold text-slate-900">{value || "-"}</p>
  </div>
);

const QuarterlyReportView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: report, isLoading, isError, error } = useQuarterlyReport(id);

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Report</h2>
          <p className="mt-3 text-slate-600">No report ID was provided.</p>
          <button
            onClick={() => navigate("/dashboard/quarterlyReportTable")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm">
          <p className="text-slate-600">Loading report details...</p>
        </div>
      </div>
    );
  }

  if (isError || !report) {
    const message =
      error instanceof Error ? error.message : "Could not load report details.";

    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Report Load Error</h2>
          <p className="mt-3 text-slate-600">{message}</p>
          <button
            onClick={() => navigate("/dashboard/quarterlyReportTable")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Quarterly Report
            </p>
            <h1 className="text-2xl font-bold mt-2">Report Details</h1>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to={`/dashboard/quarterlyReportEdit/${report.id}`}
              className="rounded-xl bg-green-600 px-4 py-2.5 text-white text-sm font-semibold"
            >
              Edit Report
            </Link>

            <button
              onClick={() => navigate("/dashboard/quarterlyReportTable")}
              className="rounded-xl border px-4 py-2.5 text-sm font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DetailRow label="Year" value={report.whichYear} />
          <DetailRow label="Period" value={report.period} />
          <DetailRow label="Total Souls" value={report.totalSouls} />
          <DetailRow label="Total Amount" value={report.totalAmount} />
          <DetailRow label="Creation Date" value={report.creationDate} />
        </div>
      </div>
    </div>
  );
};

export default QuarterlyReportView;