import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSpecialProject } from "../hooks/useSpecialProjects";

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

const SpecialProjectsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: report, isLoading, isError, error } = useSpecialProject(id);

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Project</h2>
          <p className="mt-3 text-slate-600">No project ID was provided.</p>
          <button
            onClick={() => navigate("/dashboard/specialProjectsTable")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white border p-8 shadow-sm">
          <p className="text-slate-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (isError || !report) {
    const message =
      error instanceof Error ? error.message : "Could not load project details.";

    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Project Load Error</h2>
          <p className="mt-3 text-slate-600">{message}</p>
          <button
            onClick={() => navigate("/dashboard/specialProjectsTable")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Special Projects
            </p>
            <h1 className="text-2xl font-bold mt-2">Project Details</h1>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to={`/dashboard/specialProjectsEdit/${report.id}`}
              className="rounded-xl bg-green-600 px-4 py-2.5 text-white text-sm font-semibold"
            >
              Edit Report
            </Link>

            <button
              onClick={() => navigate("/dashboard/specialProjectsTable")}
              className="rounded-xl border px-4 py-2.5 text-sm font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DetailRow label="Project Name" value={report.projectName} />
          <DetailRow label="Project Location" value={report.projectLocation} />
          <DetailRow label="State" value={report.state} />
          <DetailRow label="Project Estimate" value={report.projectEstimate} />
          <DetailRow label="Project Cost" value={report.projectCost} />
          <DetailRow label="Project Start Date" value={report.projectStartDate} />
          <DetailRow label="Project Completed Date" value={report.projectCompletedDate} />
          <DetailRow label="Project Manager" value={report.projectManager} />
          <DetailRow label="Project Aid / Funding" value={report.projectAid} />
          <div className="md:col-span-2 xl:col-span-3">
            <DetailRow label="Project Description" value={report.projectDescription} />
          </div>
          <div className="md:col-span-2 xl:col-span-3">
            <DetailRow label="Project Remarks" value={report.projectRemarks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProjectsView;