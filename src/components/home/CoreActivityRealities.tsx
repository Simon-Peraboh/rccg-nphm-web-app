import React from "react";
import {
  FaBalanceScale,
  FaBed,
  FaHandHoldingHeart,
  FaHospital,
  FaShieldAlt,
} from "react-icons/fa";

const coreActivities = [
  {
    title: "Prison Outreach",
    focus: "Overcrowding, delayed trials, and difficult access to justice leave many inmates without hope or support.",
    reality: "Many correctional facilities are under pressure, with welfare, legal, and spiritual care needs that require sustained attention.",
    icon: FaBalanceScale,
  },
  {
    title: "Hospital Outreach",
    focus: "Healthcare gaps, high treatment costs, and limited support systems leave patients and families vulnerable.",
    reality: "Patients often need more than medicine: prayer, encouragement, welfare support, and practical follow-up matter.",
    icon: FaHospital,
  },
  {
    title: "Police Station Outreach",
    focus: "Arbitrary detention, harsh handling, and weak legal support can push vulnerable people deeper into the justice system.",
    reality: "Compassionate intervention at police stations can protect dignity and connect people to care before situations worsen.",
    icon: FaShieldAlt,
  },
  {
    title: "Old People's Home Outreach",
    focus: "Inadequate elderly-care facilities and social isolation leave many older people without consistent companionship.",
    reality: "Visits, welfare support, and pastoral care help restore dignity and remind elders they are seen and valued.",
    icon: FaBed,
  },
];

const CoreActivityRealities: React.FC = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
              Four Core Activity Areas
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Where compassion meets Nigeria's urgent realities
            </h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            RCCG NPHM focuses on prisons, hospitals, police stations, and old
            people's homes because these are places where pressure, neglect, and
            pain often converge.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {coreActivities.map((activity) => (
            <article
              key={activity.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                <activity.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-black text-slate-950">
                {activity.title}
              </h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-800">
                {activity.focus}
              </p>
              <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-600">
                {activity.reality}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-rose-100 bg-rose-50 p-5 text-slate-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white text-rose-600 shadow-sm">
              <FaHandHoldingHeart className="h-5 w-5" />
            </span>
            <p className="text-sm leading-7">
              These realities are not statistics on a page for the ministry;
              they are people, families, and communities that need presence,
              advocacy, care, and the love of Christ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreActivityRealities;
