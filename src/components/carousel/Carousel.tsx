import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { usePublicSpecialProjects } from "../../dashboard/hooks/useSpecialProjects";
import type { PublicSpecialProject } from "../../dashboard/types/specialProjects";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const PLACEHOLDER_IMAGE = "/placeholder.png";

const normalizeImageUrl = (imagePath?: string | File | null): string | null => {
  if (!imagePath || typeof imagePath !== "string") {
    return null;
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  let normalizedPath = imagePath.trim();
  normalizedPath = normalizedPath.replace(/^\/+/, "");
  normalizedPath = normalizedPath.replace(/^public\//, "");
  normalizedPath = normalizedPath.replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${normalizedPath}`;
};

const getProjectImage = (project: PublicSpecialProject): string | null => {
  return (
    normalizeImageUrl(project.completedImageUrl) ||
    normalizeImageUrl(project.inProgressImageUrl) ||
    normalizeImageUrl(project.beforeImageUrl) ||
    normalizeImageUrl(project.projectCompletedImage) ||
    normalizeImageUrl(project.projectInProgressImage) ||
    normalizeImageUrl(project.projectBeforeImage) ||
    null
  );
};

const truncate = (value?: string | null, max = 140) => {
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const SpecialProjectsCarousel: React.FC = () => {
  const { data, isLoading, isError } = usePublicSpecialProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const projects = useMemo(() => {
    const normalized = Array.isArray(data) ? data : [];
    return normalized;
  }, [data]);

  useEffect(() => {
    if (projects.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, [projects.length]);

  useEffect(() => {
    if (projects.length === 0) {
      setCurrentIndex(0);
      return;
    }

    if (currentIndex >= projects.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, projects.length]);

  const nextSlide = () => {
    if (!projects.length) return;
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!projects.length) return;
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  if (isLoading) {
    return (
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="h-[420px] animate-pulse bg-slate-200" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || projects.length === 0) {
    return (
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              No special projects available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const project = projects[currentIndex];
  const image = getProjectImage(project);
  const hasImageError = !!imageErrorMap[project.id];

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            Special Projects
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Transforming care into visible impact
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Dynamic reports from the ministry’s outreach work across communities and institutions.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <div className="relative min-h-[320px] h-[320px] object-cover overflow-hidden bg-slate-100 sm:h-[420px] lg:h-[480px]">
              {image && !hasImageError ? (
                <img
                  src={image}
                  alt={project.projectName}
                  className="h-full w-full object-cover object-center"
                  onError={() =>
                    setImageErrorMap((prev) => ({
                      ...prev,
                      [project.id]: true,
                    }))
                  }
                />
              ) : (
                <img
                  src={PLACEHOLDER_IMAGE}
                  alt="Project placeholder"
                  className="h-full w-full object-cover object-center"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/10 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xl">
                <div className="rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl sm:p-5">
                  <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>
                      {project.projectLocation}, {project.state}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {project.projectName}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                    {truncate(project.projectDescription, 160)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between bg-white p-5 sm:p-6 lg:h-[480px]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Project Overview
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Manager
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {project.projectManager || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Aid / Sponsor
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {project.projectAid || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Cost
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {project.projectCost || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Completed
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {formatDate(project.projectCompletedDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous project"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next project"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to project ${index + 1}`}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${currentIndex === index ? "w-8 bg-sky-500" : "w-2.5 bg-slate-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialProjectsCarousel;
