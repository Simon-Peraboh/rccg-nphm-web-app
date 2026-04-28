import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSecretaryNote, useUpdateSecretaryNote } from "../hooks/useSecretaryNote";
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

const SecretaryNoteEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const noteId = id as string;
  const navigate = useNavigate();

  const { data, isLoading } = useSecretaryNote(noteId);
  const updateMutation = useUpdateSecretaryNote();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SecretaryNoteDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!data) return;

    setValue("meetingVenue", data.meetingVenue);
    setValue("meetingAnchor", data.meetingAnchor);
    setValue("attendanceMen", data.attendanceMen);
    setValue("attendanceWomen", data.attendanceWomen);
    setValue("attendanceChildren", data.attendanceChildren);
    setValue("attendanceTotal", data.attendanceTotal);
    setValue("detailOfMeeting", data.detailOfMeeting);
    setValue("actionablePoints", data.actionablePoints);
    setValue("actionablePointsAssigned", data.actionablePointsAssigned);
    setValue("meetingDate", data.meetingDate);
  
  }, [data, setValue]);

  const onSubmit = async (formData: SecretaryNoteDTO) => {
    try {
      await updateMutation.mutateAsync({
        id: noteId,
        payload: formData,
      });

      setTimeout(() => navigate("/dashboard/secretaryNoteTable"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to update note"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update note");
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading note...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <ToastContainer position="top-center" />

      <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Secretary Notes
          </p>
          <h1 className="text-2xl font-bold mt-2">Edit Note</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
          {[
            ["meetingVenue", "Meeting Venue"],
            ["meetingAnchor", "Meeting Anchor"],
            ["attendanceMen", "Attendance Men"],
            ["attendanceWomen", "Attendance Women"],
            ["attendanceChildren", "Attendance Children"],
            ["attendanceTotal", "Attendance Total"],
            ["actionablePoints", "Actionable Points"],
            ["actionablePointsAssigned", "Assigned To"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                {...register(name as keyof SecretaryNoteDTO)}
                className="w-full rounded-xl border px-3 py-2.5"
              />
              {errors[name as keyof SecretaryNoteDTO] && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors[name as keyof SecretaryNoteDTO]?.message ?? "")}
                </p>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Detail Of Meeting</label>
            <textarea
              {...register("detailOfMeeting")}
              className="w-full rounded-xl border px-3 py-2.5 min-h-[110px]"
            />
            {errors.detailOfMeeting && (
              <p className="text-red-500 text-xs mt-1">{errors.detailOfMeeting.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Meeting Date</label>
            <input
              type="date"
              {...register("meetingDate")}
              className="w-full rounded-xl border px-3 py-2.5"
            />
            {errors.meetingDate && (
              <p className="text-red-500 text-xs mt-1">{errors.meetingDate.message}</p>
            )}
          </div>

         

          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-xl bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {updateMutation.isPending ? "Updating..." : "Update Note"}
            </button>

            <Link
              to="/dashboard/secretaryNoteTable"
              className="rounded-xl border px-5 py-2.5 text-sm font-semibold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecretaryNoteEdit;