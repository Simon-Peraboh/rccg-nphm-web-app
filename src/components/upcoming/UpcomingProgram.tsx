import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { dashboardApi } from "../../dashboard/lib/axios";
import fallbackProgramImage from "../../assets/Images/nphm conf2026.jpeg";

type UpcomingProgramItem = {
  id: string | number;
  title: string;
  date?: string | null;
  time?: string | null;
  location?: string | null;
  imageUrl?: string | null;
  alertMessage?: string | null;
};

type RawUpcomingProgram = Partial<UpcomingProgramItem> & {
  event_title?: string | null;
  event_date?: string | null;
  event_time?: string | null;
  image_url?: string | null;
  image?: string | null;
  alert_message?: string | null;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const DEFAULT_PROGRAM_IMAGE = fallbackProgramImage;

const handleProgramImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const image = event.currentTarget;

  if (image.dataset.fallbackApplied === "true") {
    return;
  }

  image.dataset.fallbackApplied = "true";
  image.src = DEFAULT_PROGRAM_IMAGE;
};

const normalizeAssetUrl = (value?: string | null) => {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  const path = value
    .trim()
    .replace(/^\/+/, "")
    .replace(/^public\//, "")
    .replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${path}`;
};

const normalizeProgram = (item: RawUpcomingProgram): UpcomingProgramItem => ({
  id: item.id ?? "upcoming-program",
  title: String(item.title ?? item.event_title ?? "Upcoming Program"),
  date: item.date ?? item.event_date ?? null,
  time: item.time ?? item.event_time ?? null,
  location: item.location ?? null,
  imageUrl: normalizeAssetUrl(item.imageUrl ?? item.image_url ?? item.image ?? null),
  alertMessage: item.alertMessage ?? item.alert_message ?? null,
});

const getUpcomingProgram = async (): Promise<UpcomingProgramItem | null> => {
  const response = await dashboardApi.get<
    RawUpcomingProgram[] | { data?: RawUpcomingProgram[] | RawUpcomingProgram | null }
  >("/public/upcoming-programs");

  const payload = response.data;
  const raw = Array.isArray(payload)
    ? payload[0]
    : Array.isArray(payload.data)
    ? payload.data[0]
    : payload.data;

  return raw ? normalizeProgram(raw) : null;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Date to be announced";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const UpcomingProgram: React.FC = () => {
  const { data: program, isLoading } = useQuery({
    queryKey: ["public", "upcoming-programs"],
    queryFn: getUpcomingProgram,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-72 animate-pulse rounded-lg bg-slate-100" />
        </div>
      </section>
    );
  }

  if (!program) {
    return null;
  }

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-72 overflow-hidden bg-slate-100">
              <img
                src={program.imageUrl || DEFAULT_PROGRAM_IMAGE}
                alt={program.title}
                className="h-full min-h-72 w-full object-cover"
                onError={handleProgramImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                Upcoming Program
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {program.title}
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <FaCalendarAlt className="mb-3 h-5 w-5 text-sky-700" />
                  <p className="text-sm font-bold text-slate-900">
                    {formatDate(program.date)}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <FaClock className="mb-3 h-5 w-5 text-sky-700" />
                  <p className="text-sm font-bold text-slate-900">
                    {program.time ?? "Time to be announced"}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <FaMapMarkerAlt className="mb-3 h-5 w-5 text-sky-700" />
                  <p className="text-sm font-bold text-slate-900">
                    {program.location ?? "Venue to be announced"}
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-amber-200 bg-amber-50 py-3">
                <p className="animate-[marquee_18s_linear_infinite] whitespace-nowrap px-4 text-sm font-bold text-amber-800">
                  {program?.alertMessage ??
                    "Watch this space for the next RCCG NPHM program announcement."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProgram;
