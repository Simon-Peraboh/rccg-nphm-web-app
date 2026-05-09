import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import {
  useCreateUpcomingProgram,
  useDeleteUpcomingProgram,
  useToggleUpcomingProgramPublish,
  useUpcomingPrograms,
} from "../hooks/useUpcomingPrograms";
import type {
  UpcomingProgramDTO,
  UpcomingProgramFormValues,
} from "../types/upcomingProgram";

const emptyForm: UpcomingProgramFormValues = {
  title: "",
  eventDate: "",
  eventTime: "",
  location: "",
  alertMessage: "",
  image: null,
  isPublished: true,
};

const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.response?.data?.error || "Action failed.";
  }

  if (error instanceof Error) return error.message;

  return "Action failed.";
};

const UpcomingProgramAdminPage: React.FC = () => {
  const { data, isLoading } = useUpcomingPrograms();
  const createMutation = useCreateUpcomingProgram();
  const deleteMutation = useDeleteUpcomingProgram();
  const togglePublishMutation = useToggleUpcomingProgramPublish();

  const [form, setForm] = useState<UpcomingProgramFormValues>(emptyForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const programs = useMemo<UpcomingProgramDTO[]>(() => data ?? [], [data]);

  const updateForm = <T extends keyof UpcomingProgramFormValues>(
    key: T,
    value: UpcomingProgramFormValues[T]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    updateForm("image", file);

    if (!file) {
      setPreview(null);
      setPreviewName("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      event.target.value = "";
      updateForm("image", null);
      setPreview(null);
      setPreviewName("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(typeof reader.result === "string" ? reader.result : null);
      setPreviewName(file.name);
    };
    reader.onerror = () => {
      toast.error("Could not preview the selected image. Please choose another file.");
      setPreview(null);
      setPreviewName("");
    };
    reader.readAsDataURL(file);
  };

  const clearImageSelection = () => {
    updateForm("image", null);
    setPreview(null);
    setPreviewName("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (!form.title.trim() || !form.eventDate.trim()) {
      toast.error("Program title and date are required.");
      return;
    }

    try {
      await createMutation.mutateAsync(form);
      setForm(emptyForm);
      setPreview(null);
      setPreviewName("");
      formElement.reset();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const handleDelete = (program: UpcomingProgramDTO) => {
    const toastId = toast.info(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p className="text-sm font-bold text-slate-950">
            Delete this upcoming program?
          </p>
          <p className="text-xs leading-5 text-slate-600">{program.title}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                closeToast?.();

                try {
                  await deleteMutation.mutateAsync(program.id);
                } catch (error) {
                  toast.error(getApiErrorMessage(error));
                }
              }}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                closeToast?.();
              }}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );

    window.setTimeout(() => toast.dismiss(toastId), 30000);
  };

  const handleTogglePublish = async (program: UpcomingProgramDTO) => {
    try {
      await togglePublishMutation.mutateAsync({
        id: program.id,
        isPublished: program.isPublished,
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                Website Content
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Upcoming Program
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Control the landing page event banner, image, and scrolling alert.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Program Title
                </label>
                <input
                  value={form.title}
                  onChange={(event) => updateForm("title", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Date
                </label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={(event) => updateForm("eventDate", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Time
                </label>
                <input
                  value={form.eventTime}
                  onChange={(event) => updateForm("eventTime", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                  placeholder="9:00 AM"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Location
                </label>
                <input
                  value={form.location}
                  onChange={(event) => updateForm("location", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Scrolling Alert Message
              </label>
              <textarea
                value={form.alertMessage}
                onChange={(event) => updateForm("alertMessage", event.target.value)}
                className="min-h-24 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Program Image
              </label>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-bold file:text-sky-700"
              />
              <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                {preview ? (
                  <div>
                    <img
                      src={preview}
                      alt="Upcoming program preview"
                      className="h-64 w-full object-cover md:w-[28rem]"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3">
                      <p className="truncate text-sm font-bold text-slate-700">
                        {previewName || "Selected image"}
                      </p>
                      <button
                        type="button"
                        onClick={clearImageSelection}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-44 w-full items-center justify-center px-4 text-center text-sm font-bold text-slate-400 md:w-[28rem]">
                    Image preview will appear here after upload
                  </div>
                )}
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(event) => updateForm("isPublished", event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-600"
              />
              Publish immediately
            </label>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700 disabled:opacity-50"
            >
              {createMutation.isPending ? "Saving..." : "Save Upcoming Program"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
              Existing Programs
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Program Feed
            </h2>
          </div>

          {isLoading ? (
            <p className="text-center text-slate-500">Loading programs...</p>
          ) : programs.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              No upcoming program created yet.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {programs.map((program) => (
                <article
                  key={program.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <div className="h-56 bg-slate-100">
                    {program.imageUrl ? (
                      <img
                        src={program.imageUrl}
                        alt={program.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-bold text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black text-slate-950">{program.title}</h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          program.isPublished
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {program.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-sky-700">
                      {[program.eventDate, program.eventTime].filter(Boolean).join(" · ")}
                    </p>

                    {program.location && (
                      <p className="text-sm leading-6 text-slate-600">{program.location}</p>
                    )}

                    {program.alertMessage && (
                      <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                        {program.alertMessage}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(program)}
                        className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
                          program.isPublished
                            ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {program.isPublished ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(program)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingProgramAdminPage;
