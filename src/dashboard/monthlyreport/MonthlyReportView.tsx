import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMonthlyReport } from "../hooks/useMonthlyReport";

const DetailRow: React.FC<{ label: string; value?: string | null }> = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border bg-slate-50 p-4">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-base font-semibold text-slate-900 whitespace-pre-wrap">
      {value || "-"}
    </p>
  </div>
);

const MonthlyReportView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: report, isLoading, isError, error } = useMonthlyReport(id);

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Report</h2>
          <p className="mt-3 text-slate-600">No report ID was provided.</p>
          <button
            onClick={() => navigate("/dashboard/monthlyReportTable")}
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
      <div className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Report Load Error</h2>
          <p className="mt-3 text-slate-600">{message}</p>
          <button
            onClick={() => navigate("/dashboard/monthlyReportTable")}
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
      <div className="mx-auto max-w-6xl rounded-3xl bg-white border p-8 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Monthly Report
            </p>
            <h1 className="text-3xl font-bold mt-2">Report Details</h1>
            <p className="text-slate-600 mt-2">
              Full view of submitted monthly field report.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to={`/dashboard/monthlyReportEdit/${report.id}`}
              className="rounded-xl bg-green-600 px-4 py-3 text-white font-semibold"
            >
              Edit Report
            </Link>

            <button
              onClick={() => navigate("/dashboard/monthlyReportTable")}
              className="rounded-xl border px-4 py-3 font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DetailRow label="State" value={report.state} />
          <DetailRow label="Region" value={report.region} />
          <DetailRow label="Province" value={report.province} />
          <DetailRow label="Coordinator Name" value={report.coordinator_name} />
          <DetailRow label="Prison Visited" value={report.prison_visited} />
          <DetailRow label="Hospital Visited" value={report.hospital_visited} />
          <DetailRow label="Police Station Visited" value={report.police_station_visited} />
          <DetailRow label="Other Places Visited" value={report.others} />
          <DetailRow label="Items" value={report.items} />
          <DetailRow label="Amount Budgeted" value={report.amount_budgeted} />
          <DetailRow label="Amount Spent" value={report.amount_spent} />
          <DetailRow label="Team Members" value={report.team_members} />
          <DetailRow label="Souls Won" value={report.souls_won} />
          <DetailRow label="Challenges" value={report.challenges} />
          <DetailRow label="Suggestion" value={report.suggestion} />
          <DetailRow label="Remarks" value={report.remarks} />
          <DetailRow label="Report Created By" value={report.report_created_by} />
          <DetailRow label="Activity Date" value={report.activity_date} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyReportView;