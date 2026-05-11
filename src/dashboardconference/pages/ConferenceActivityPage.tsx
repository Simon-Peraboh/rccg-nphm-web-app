import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FaDownload, FaFileAlt } from "react-icons/fa";
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const DEFAULT_ACTIVITY_DOCUMENT_URL =
  "/documents/RMF_2026_CONVENTION_PROGRAM_OUTLINE.pdf";
const DEFAULT_ACTIVITY_DOCUMENT_NAME = "RMF 2026 Convention Program Outline";

const normalizeDocumentUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  const path = value
    .trim()
    .replace(/^\/+/, "")
    .replace(/^public\//, "")
    .replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${path}`;
};

const getActivityDocumentUrl = (activity: ConferenceActivity) =>
  normalizeDocumentUrl(
    activity.documentUrl ??
      activity.document_url ??
      activity.documentPath ??
      activity.document_path ??
      ""
  ) || DEFAULT_ACTIVITY_DOCUMENT_URL;

const getActivityDocumentName = (activity: ConferenceActivity) =>
  activity.documentName ??
  activity.document_name ??
  DEFAULT_ACTIVITY_DOCUMENT_NAME;

const extractBackendMessages = (value: unknown): string[] => {
  if (!value) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(extractBackendMessages);
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap(extractBackendMessages);
  }
  return [];
};

const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    const messages = extractBackendMessages(data?.message ?? data?.errors);

    if (messages.length > 0) {
      return messages[0];
    }

    return data?.error || "Failed to create conference activity.";
  }

  return "Unexpected error occurred.";
};

const ConferenceActivityPage: React.FC = () => {
  const { data, isLoading, refetch } = useConferenceEvents();
  const createActivityMutation = useCreateConferenceActivity();
  const documentInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);

  const events: ActiveConferenceResponse[] = data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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
      document: null,
      sort_order: 0,
    },
  });

  const selectedEventId = Number(watch("conference_event_id"));
  const selectedEvent = events.find((event) => event.id === selectedEventId);

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (file && file.size > 20 * 1024 * 1024) {
      toast.error("Document must not be larger than 20MB.");
      event.target.value = "";
      setSelectedDocument(null);
      setValue("document", null, { shouldDirty: true });
      return;
    }

    setSelectedDocument(file);
    setValue("document", file, { shouldDirty: true });
  };

  const onSubmit = async (data: ActivityFormInputs) => {
    try {
      const { conference_event_id, ...payload } = data;
      const eventId = Number(conference_event_id);

      if (!eventId) {
        toast.error("Please select a conference event.");
        return;
      }

      const result = await createActivityMutation.mutateAsync({
        conferenceEventId: eventId,
        payload: {
          ...payload,
          document: selectedDocument ?? payload.document ?? null,
        },
      });

      await refetch();
      toast.success(result.message || "Conference activity created successfully.");

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
        document: null,
        sort_order: 0,
      });
      setSelectedDocument(null);
      if (documentInputRef.current) {
        documentInputRef.current.value = "";
      }
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="min-w-0 rounded-3xl bg-white border p-5 shadow-sm sm:p-8">
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
                  validate: (value) =>
                    Number(value) > 0 || "Please select a conference event",
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

            <div>
              <label className="block text-sm font-medium mb-1">
                Attach PDF or Word Document
              </label>
              <input
                ref={documentInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleDocumentChange}
                className="w-full rounded-xl border px-4 py-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700"
              />
              {selectedDocument && (
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Selected: {selectedDocument.name}
                </p>
              )}
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

        <div className="min-w-0 rounded-3xl bg-white border p-5 shadow-sm sm:p-8">
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
                      {getActivityDocumentUrl(activity) && (
                        <a
                          href={getActivityDocumentUrl(activity)}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                        >
                          <FaFileAlt />
                          {getActivityDocumentName(activity)}
                          <FaDownload />
                        </a>
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
