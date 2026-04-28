import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useConferenceEvents,
  useCreateConferenceActivity,
} from "../hooks/useConferenceManagerQueries";
import type {
  ActiveConferenceResponse,
  ConferenceActivity,
  CreateConferenceActivityDTO,
} from "../types/conferenceManager";
import { formatDisplayDate, formatDisplayTime } from "../utils/formatters";

type ActivityFormInputs = CreateConferenceActivityDTO & {
  conference_event_id: number;
};

const ConferenceActivityPage: React.FC = () => {
  const { data, isLoading } = useConferenceEvents();
  const createActivityMutation = useCreateConferenceActivity();

  const events: ActiveConferenceResponse[] = data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ActivityFormInputs>({
    defaultValues: {
      conference_event_id: 0,
      day_number: 1,
      activity_date: "",
      start_time: "",
      end_time: "",
      title: "",
      facilitator: "",
      location: "",
      description: "",
      sort_order: 0,
    },
  });

  const selectedEventId = Number(watch("conference_event_id"));
  const selectedEvent = events.find((event) => event.id === selectedEventId);

  const onSubmit = async (data: ActivityFormInputs) => {
    try {
      const { conference_event_id, ...payload } = data;

      await createActivityMutation.mutateAsync({
        conferenceEventId: Number(conference_event_id),
        payload,
      });

      reset({
        conference_event_id,
        day_number: 1,
        activity_date: "",
        start_time: "",
        end_time: "",
        title: "",
        facilitator: "",
        location: "",
        description: "",
        sort_order: 0,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to create conference activity."
        );
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Conference Manager
          </p>
          <h1 className="text-3xl font-bold mt-2 mb-6">Create Conference Activity</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Conference Event</label>
              <select
                {...register("conference_event_id", {
                  required: "Conference event is required",
                  valueAsNumber: true,
                })}
                className="w-full rounded-xl border px-4 py-3"
              >
                <option value={0}>Select conference event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} ({event.year})
                  </option>
                ))}
              </select>
              {errors.conference_event_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.conference_event_id.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Day Number</label>
                <input
                  type="number"
                  {...register("day_number", {
                    required: "Day number is required",
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sort Order</label>
                <input
                  type="number"
                  {...register("sort_order", { valueAsNumber: true })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Opening Session"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium mb-1">Activity Date</label>
                <input
                  type="date"
                  {...register("activity_date", { required: "Activity date is required" })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  {...register("start_time", { required: "Start time is required" })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  {...register("end_time", { required: "End time is required" })}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Facilitator</label>
                <input
                  {...register("facilitator")}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Pastor John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  {...register("location")}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Main Auditorium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register("description")}
                className="w-full rounded-xl border px-4 py-3 min-h-[120px]"
                placeholder="Describe the session..."
              />
            </div>

            <button
              type="submit"
              disabled={createActivityMutation.isPending}
              className="rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold disabled:opacity-50"
            >
              {createActivityMutation.isPending ? "Creating..." : "Create Activity"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Event Activities
          </p>
          <h2 className="text-2xl font-bold mt-2 mb-6">
            {selectedEvent ? `${selectedEvent.title} Activities` : "Select an Event"}
          </h2>

          {isLoading ? (
            <p className="text-slate-500">Loading events...</p>
          ) : (selectedEvent?.activities ?? []).length > 0 ? (
            <div className="space-y-4">
              {(selectedEvent?.activities ?? []).map((activity: ConferenceActivity) => (
                <div key={activity.id} className="rounded-2xl border bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg">{activity.title}</h3>
                      <p className="text-sm text-slate-500">
                        Day {activity.day_number} • {formatDisplayDate(activity.activity_date)}
                      </p>
                      <p className="text-sm mt-1">
                        {formatDisplayTime(activity.start_time)} - {formatDisplayTime(activity.end_time)}
                      </p>
                      {activity.location && (
                        <p className="text-sm mt-2">
                          <strong>Venue:</strong> {activity.location}
                        </p>
                      )}
                      {activity.facilitator && (
                        <p className="text-sm">
                          <strong>Facilitator:</strong> {activity.facilitator}
                        </p>
                      )}
                      {activity.description && (
                        <p className="text-sm text-slate-600 mt-2">{activity.description}</p>
                      )}
                    </div>

                    <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                      #{activity.sort_order}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed p-6 text-center text-slate-500">
              No activities found for the selected event.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConferenceActivityPage;