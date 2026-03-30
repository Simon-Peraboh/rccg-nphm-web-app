import React, { useMemo } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { usePublicMinistryActivities } from "../../dashboard/hooks/useMinistryActivities";

const PLACEHOLDER_IMAGE = "/placeholder.png";

const formatDate = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const truncate = (value?: string | null, max = 110) => {
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

const Visitation: React.FC = () => {
  const { data, isLoading, isError } = usePublicMinistryActivities();

  const activities = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const featuredActivity = activities[0];
  const secondaryActivities = activities.slice(1, 7);

  if (isLoading) {
    return (
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mx-auto h-4 w-28 animate-pulse rounded bg-slate-200" />
            <div className="mx-auto mt-4 h-10 w-80 animate-pulse rounded bg-slate-200" />
            <div className="mx-auto mt-3 h-5 w-[32rem] max-w-full animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="h-[420px] animate-pulse rounded-[32px] bg-slate-200" />
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-[200px] animate-pulse rounded-[28px] bg-slate-200" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || activities.length === 0) {
    return (
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Latest Updates
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ministry Activities In Pictures
          </h2>
          <div className="mx-auto mt-8 max-w-4xl rounded-[32px] border border-slate-200 bg-slate-50 p-12 text-slate-500 shadow-sm">
            No ministry activities available at the moment.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.05),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Latest Updates
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Ministry Activities In Pictures
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            See the latest outreach moments across prisons, hospitals, awareness visits,
            and ministry events.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <div className="relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[520px]">
              <img
                src={featuredActivity.imageUrl || PLACEHOLDER_IMAGE}
                alt={featuredActivity.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur">
                Most Recent Activity
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-white/90">
                  {featuredActivity.location && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{featuredActivity.location}</span>
                    </div>
                  )}

                  {featuredActivity.activityDate && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-sm">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>{formatDate(featuredActivity.activityDate)}</span>
                    </div>
                  )}
                </div>

                <h3 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  {featuredActivity.title}
                </h3>

                {featuredActivity.caption && (
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base">
                    {truncate(featuredActivity.caption, 170)}
                  </p>
                )}
              </div>
            </div>
          </article>

          <div className="grid gap-6 sm:grid-cols-2">
            {secondaryActivities.map((activity) => (
              <article
                key={activity.id}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={activity.imageUrl || PLACEHOLDER_IMAGE}
                    alt={activity.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                  {activity.location && (
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 shadow-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{activity.location}</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-2xl font-semibold leading-tight text-white">
                      {activity.title}
                    </h3>

                    {activity.caption && (
                      <p className="mt-2 text-sm leading-6 text-slate-100">
                        {truncate(activity.caption, 65)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Latest Ministry Activity
                  </p>

                  {activity.activityDate && (
                    <div className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>{formatDate(activity.activityDate)}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visitation;