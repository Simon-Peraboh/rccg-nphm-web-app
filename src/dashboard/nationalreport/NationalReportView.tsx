import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useNationalReport } from "../hooks/useNationalReport";

const DetailRow: React.FC<{ label: string; value?: string | null }> = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border bg-slate-50 p-4">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-semibold text-slate-900 whitespace-pre-wrap">
      {value || "-"}
    </p>
  </div>
);

const NationalReportView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: report, isLoading, isError, error } = useNationalReport(id);

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Report</h2>
          <p className="mt-3 text-slate-600">No report ID was provided.</p>

          <button
            onClick={() => navigate("/dashboard/nationalReportTable")}
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
            onClick={() => navigate("/dashboard/nationalReportTable")}
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
      <div className="mx-auto max-w-5xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              National Report
            </p>
            <h1 className="text-2xl font-bold mt-2">Report Details</h1>
            <p className="text-slate-600 mt-1 text-sm">
              Full view of submitted national report.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to={`/dashboard/nationalReportEdit/${report.id}`}
              className="rounded-xl bg-green-600 px-4 py-2.5 text-white text-sm font-semibold"
            >
              Edit Report
            </Link>

            <button
              onClick={() => navigate("/dashboard/nationalReportTable")}
              className="rounded-xl border px-4 py-2.5 text-sm font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DetailRow label="Core Duties" value={report.core_duties} />
          <DetailRow label="Monthly Task" value={report.monthly_task} />
          <DetailRow label="Task Done" value={report.task_done} />
          <DetailRow label="Strength" value={report.strength} />
          <DetailRow label="Weakness" value={report.weakness} />
          <DetailRow label="Opportunities" value={report.opportunities} />
          <DetailRow label="Threats" value={report.threats} />
          <DetailRow label="Amount Budgeted" value={report.amount_budgeted} />
          <DetailRow label="Amount Spent" value={report.amount_spent} />
          <DetailRow label="Remarks" value={report.remarks} />
          <DetailRow label="Created At" value={report.created_at} />
        </div>
      </div>
    </div>
  );
};

export default NationalReportView;