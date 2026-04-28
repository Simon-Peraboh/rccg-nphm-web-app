import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSecretaryNote } from "../hooks/useSecretaryNote";

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

const SecretaryNoteView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: note, isLoading, isError, error } = useSecretaryNote(id);

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Note</h2>
          <p className="mt-3 text-slate-600">No note ID was provided.</p>
          <button
            onClick={() => navigate("/dashboard/secretaryNoteTable")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white border p-8 shadow-sm">
          <p className="text-slate-600">Loading note details...</p>
        </div>
      </div>
    );
  }

  if (isError || !note) {
    const message =
      error instanceof Error ? error.message : "Could not load note details.";

    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white border p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600">Note Load Error</h2>
          <p className="mt-3 text-slate-600">{message}</p>
          <button
            onClick={() => navigate("/dashboard/secretaryNoteTable")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold"
          >
            Back to Notes
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
              Secretary Notes
            </p>
            <h1 className="text-2xl font-bold mt-2">Meeting Note Details</h1>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to={`/dashboard/secretaryNoteEdit/${note.id}`}
              className="rounded-xl bg-green-600 px-4 py-2.5 text-white text-sm font-semibold"
            >
              Edit Note
            </Link>

            <button
              onClick={() => navigate("/dashboard/secretaryNoteTable")}
              className="rounded-xl border px-4 py-2.5 text-sm font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DetailRow label="Meeting Venue" value={note.meetingVenue} />
          <DetailRow label="Meeting Anchor" value={note.meetingAnchor} />
          <DetailRow label="Attendance Men" value={note.attendanceMen} />
          <DetailRow label="Attendance Women" value={note.attendanceWomen} />
          <DetailRow label="Attendance Children" value={note.attendanceChildren} />
          <DetailRow label="Attendance Total" value={note.attendanceTotal} />
          <DetailRow label="Actionable Points" value={note.actionablePoints} />
          <DetailRow label="Assigned To" value={note.actionablePointsAssigned} />
          <DetailRow label="Meeting Date" value={note.meetingDate} />
          <DetailRow label="Created Date" value={note.created_at} />
          <div className="md:col-span-2 xl:col-span-3">
            <DetailRow label="Detail Of Meeting" value={note.detailOfMeeting} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretaryNoteView;