import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMonthlyDueReport } from "../hooks/useMonthlyDue";

const DetailRow: React.FC<{ label: string; value?: string | null }> = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border bg-slate-50 p-4">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-base font-semibold text-slate-900">{value || "-"}</p>
  </div>
);

const MonthlyDueView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: report, isLoading, isError, error } = useMonthlyDueReport(id);

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Report</h2>
          <p className="mt-3 text-slate-600">No report ID was provided.</p>

          <button
            onClick={() => navigate("/dashboard/monthlyDueTable")}
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
      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white border p-8 shadow-sm">
          <p className="text-slate-600">Loading report details...</p>
        </div>
      </div>
    );
  }

  if (isError || !report) {
    const message =
      error instanceof Error ? error.message : "Could not load report details.";

    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Report Load Error</h2>
          <p className="mt-3 text-slate-600">{message}</p>

          <button
            onClick={() => navigate("/dashboard/monthlyDueTable")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Monthly Due Management
            </p>
            <h1 className="text-3xl font-bold mt-2">Monthly Due Report Details</h1>
            <p className="text-slate-600 mt-2">
              Review the full monthly due payment record.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to={`/dashboard/monthlyDueEdit/${report.id}`}
              className="rounded-xl bg-green-600 px-4 py-3 text-white font-semibold"
            >
              Edit Report
            </Link>

            <button
              onClick={() => navigate("/dashboard/monthlyDueTable")}
              className="rounded-xl border px-4 py-3 font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DetailRow label="Amount Paid" value={report.amount} />
          <DetailRow label="Province" value={report.province} />
          <DetailRow label="Payment Date" value={report.paymentDate} />
          <DetailRow label="Province Coordinator" value={report.provinceCoordinator} />
          <DetailRow label="Reference Month" value={report.refMonth} />
          <DetailRow label="Who Paid" value={report.whoPaid} />
          <DetailRow label="Remark" value={report.remark} />
          <DetailRow label="Report ID" value={report.id} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyDueView;