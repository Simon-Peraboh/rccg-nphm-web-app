import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useCreateSecretaryNote } from "../hooks/useSecretaryNote";
import type { SecretaryNoteDTO } from "../types/secretaryNote";

const schema = yup.object({
  meetingVenue: yup.string().required("Meeting venue is required"),
  meetingAnchor: yup.string().required("Meeting anchor is required"),
  attendanceMen: yup.string().required("Attendance for men is required"),
  attendanceWomen: yup.string().required("Attendance for women is required"),
  attendanceChildren: yup.string().required("Attendance for children is required"),
  attendanceTotal: yup.string().required("Total attendance is required"),
  detailOfMeeting: yup.string().required("Meeting detail is required"),
  actionablePoints: yup.string().required("Actionable points are required"),
  actionablePointsAssigned: yup.string().required("Assigned person is required"),
  meetingDate: yup.string().required("Meeting date is required"),
});

const SecretaryNoteCreate: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateSecretaryNote();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecretaryNoteDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
  meetingVenue: "",
  meetingAnchor: "",
  attendanceMen: "",
  attendanceWomen: "",
  attendanceChildren: "",
  attendanceTotal: "",
  detailOfMeeting: "",
  actionablePoints: "",
  actionablePointsAssigned: "",
  meetingDate: "",
},
  });

  const onSubmit = async (data: SecretaryNoteDTO) => {
    try {
      await createMutation.mutateAsync(data);
      setTimeout(() => navigate("/dashboard/secretaryNoteTable"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to create note"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create note");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Secretary Notes
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Create Minutes of Meeting
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Capture meeting details, attendance, action items, and accountability in one clean record.
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
              to="/dashboard/secretaryNoteTable"
              className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Notes
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Meeting Information</h2>
            <p className="mt-1 text-sm text-slate-500">
              Record where the meeting happened, who anchored it, and when it took place.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="meetingVenue" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Meeting Venue
                </label>
                <input
                  id="meetingVenue"
                  type="text"
                  placeholder="Enter meeting venue"
                  {...register("meetingVenue")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.meetingVenue && (
                  <p className="mt-1 text-xs text-red-500">{errors.meetingVenue.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="meetingAnchor" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Meeting Anchor
                </label>
                <input
                  id="meetingAnchor"
                  type="text"
                  placeholder="Enter who anchored the meeting"
                  {...register("meetingAnchor")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.meetingAnchor && (
                  <p className="mt-1 text-xs text-red-500">{errors.meetingAnchor.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="meetingDate" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Date of Meeting
                </label>
                <input
                  id="meetingDate"
                  type="date"
                  {...register("meetingDate")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.meetingDate && (
                  <p className="mt-1 text-xs text-red-500">{errors.meetingDate.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Attendance Breakdown</h2>
            <p className="mt-1 text-sm text-slate-500">
              Record who was present and the total attendance count.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="attendanceMen" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Attendance Men
                </label>
                <input
                  id="attendanceMen"
                  type="text"
                  placeholder="Enter number of men"
                  {...register("attendanceMen")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.attendanceMen && (
                  <p className="mt-1 text-xs text-red-500">{errors.attendanceMen.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="attendanceWomen" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Attendance Women
                </label>
                <input
                  id="attendanceWomen"
                  type="text"
                  placeholder="Enter number of women"
                  {...register("attendanceWomen")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.attendanceWomen && (
                  <p className="mt-1 text-xs text-red-500">{errors.attendanceWomen.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="attendanceChildren" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Attendance Children
                </label>
                <input
                  id="attendanceChildren"
                  type="text"
                  placeholder="Enter number of children"
                  {...register("attendanceChildren")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.attendanceChildren && (
                  <p className="mt-1 text-xs text-red-500">{errors.attendanceChildren.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="attendanceTotal" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Total Attendance
                </label>
                <input
                  id="attendanceTotal"
                  type="text"
                  placeholder="Enter total attendance"
                  {...register("attendanceTotal")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.attendanceTotal && (
                  <p className="mt-1 text-xs text-red-500">{errors.attendanceTotal.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Meeting Outcome</h2>
            <p className="mt-1 text-sm text-slate-500">
              Document what happened, what needs action, and who owns the next step.
            </p>

            <div className="mt-5 grid gap-4">
              <div>
                <label htmlFor="detailOfMeeting" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Detail of Meeting
                </label>
                <textarea
                  id="detailOfMeeting"
                  {...register("detailOfMeeting")}
                  placeholder="Enter meeting details"
                  className="min-h-[130px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                />
                {errors.detailOfMeeting && (
                  <p className="mt-1 text-xs text-red-500">{errors.detailOfMeeting.message}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="actionablePoints" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Actionable Points
                  </label>
                  <textarea
                    id="actionablePoints"
                    {...register("actionablePoints")}
                    placeholder="Enter actionable points"
                    className="min-h-[110px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  />
                  {errors.actionablePoints && (
                    <p className="mt-1 text-xs text-red-500">{errors.actionablePoints.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="actionablePointsAssigned" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Assigned To
                  </label>
                  <input
                    id="actionablePointsAssigned"
                    type="text"
                    placeholder="Who owns the action points"
                    {...register("actionablePointsAssigned")}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                  />
                  {errors.actionablePointsAssigned && (
                    <p className="mt-1 text-xs text-red-500">{errors.actionablePointsAssigned.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating..." : "Create Note"}
            </button>

            <Link
              to="/dashboard/secretaryNoteTable"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecretaryNoteCreate;