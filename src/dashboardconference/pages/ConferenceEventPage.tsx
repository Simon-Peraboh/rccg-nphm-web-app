import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  useConferenceEvents,
  useCreateConferenceEvent,
  useDeleteConferenceEvent,
} from "../hooks/useConferenceManagerQueries";
import type {
  ConferenceEventListItem,
  CreateConferenceEventDTO,
} from "../types/conferenceManager";
import { formatDisplayDate, formatDisplayDateTime } from "../utils/formatters";

const ConferenceEventPage: React.FC = () => {
  const { data, isLoading } = useConferenceEvents();
  const createEventMutation = useCreateConferenceEvent();
  const deleteEventMutation = useDeleteConferenceEvent();

  const events: ConferenceEventListItem[] = data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateConferenceEventDTO>({
    defaultValues: {
      title: "",
      year: new Date().getFullYear(),
      theme: "",
      abbreviation: "",
      start_date: "",
      end_date: "",
      registration_open_at: "",
      registration_close_at: "",
      status: "draft",
      is_active: false,
    },
  });

  const onSubmit = async (data: CreateConferenceEventDTO) => {
    try {
      await createEventMutation.mutateAsync({
        ...data,
        year: Number(data.year),
      });
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to create conference event."
        );
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  const handleDelete = (eventId: number) => {
    confirmAlert({
      title: "Delete Conference Event",
      message: "Are you sure you want to delete this conference event?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteEventMutation.mutateAsync(eventId);
              // success toast already handled in hook, but harmless if you prefer it there instead
            } catch (error: unknown) {
              if (axios.isAxiosError(error)) {
                toast.error(
                  error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Failed to delete conference event."
                );
              } else if (error instanceof Error) {
                toast.error(error.message);
              } else {
                toast.error("Unexpected error occurred while deleting.");
              }
            }
          },
        },
        {
          label: "No",
          onClick: () => undefined,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <ToastContainer position="top-center" theme="colored" />

      <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Conference Manager
          </p>
          <h1 className="text-3xl font-bold mt-2 mb-6">Create Conference Event</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="NPHM Conference 2026"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  {...register("year", {
                    required: "Year is required",
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border px-4 py-3"
                />
                {errors.year && (
                  <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Abbreviation</label>
                <input
                  {...register("abbreviation", {
                    required: "Abbreviation is required",
                  })}
                  className="w-full rounded-xl border px-4 py-3 uppercase"
                  placeholder="ANB"
                />
                {errors.abbreviation && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.abbreviation.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Theme</label>
              <input
                {...register("theme", { required: "Theme is required" })}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="A New Beginning"
              />
              {errors.theme && (
                <p className="text-sm text-red-500 mt-1">{errors.theme.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  {...register("start_date", { required: "Start date is required" })}
                  className="w-full rounded-xl border px-4 py-3"
                />
                {errors.start_date && (
                  <p className="text-sm text-red-500 mt-1">{errors.start_date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  {...register("end_date", { required: "End date is required" })}
                  className="w-full rounded-xl border px-4 py-3"
                />
                {errors.end_date && (
                  <p className="text-sm text-red-500 mt-1">{errors.end_date.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Registration Opens</label>
                <input
                  type="datetime-local"
                  {...register("registration_open_at")}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Registration Closes</label>
                <input
                  type="datetime-local"
                  {...register("registration_close_at")}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="w-full rounded-xl border px-4 py-3"
                >
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-8">
                <input type="checkbox" {...register("is_active")} />
                <label className="text-sm font-medium">Set as active conference</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={createEventMutation.isPending}
              className="rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold disabled:opacity-50"
            >
              {createEventMutation.isPending ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Existing Events
          </p>
          <h2 className="text-2xl font-bold mt-2 mb-6">Conference Events</h2>

          {isLoading ? (
            <p className="text-slate-500">Loading events...</p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="rounded-2xl border bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-slate-500">{event.theme}</p>
                      <p className="text-sm mt-2">
                        {formatDisplayDate(event.start_date)} — {formatDisplayDate(event.end_date)}
                      </p>
                      <p className="text-sm mt-1">
                        Opens: {formatDisplayDateTime(event.registration_open_at)}
                      </p>
                      <p className="text-sm">
                        Closes: {formatDisplayDateTime(event.registration_close_at)}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                        {event.year}
                      </span>
                      <p className="text-xs mt-2 uppercase text-slate-500">
                        {event.abbreviation}
                      </p>
                      {event.is_active && (
                        <p className="text-xs mt-1 text-green-600 font-semibold">Active</p>
                      )}

                      <button
                        type="button"
                        title="Delete conference event"
                        disabled={deleteEventMutation.isPending}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                        onClick={() => handleDelete(event.id)}
                      >
                        <FaTrash />
                        <span>
                          {deleteEventMutation.isPending ? "Deleting..." : "Delete"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {events.length === 0 && (
                <div className="rounded-2xl border border-dashed p-6 text-center text-slate-500">
                  No conference events yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConferenceEventPage;