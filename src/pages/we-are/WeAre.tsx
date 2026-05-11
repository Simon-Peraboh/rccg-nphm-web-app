import {
  FaBookOpen,
  FaBullseye,
  FaCross,
  FaHandsHelping,
  FaHandshake,
  FaPray,
  FaQuoteLeft,
  FaUserFriends,
} from "react-icons/fa";
import { Footer, Header } from "../../components";
import {
  historyPastorAbu,
  historyPastorOdesola,
  pastorThomas,
  pic1,
  pic2,
} from "./index";

const ministryData = [
  {
    name: "National Level",
    description:
      "Provides national direction, doctrine-aligned oversight, reporting standards, and strategic coordination for the ministry across RCCG.",
    icon: FaHandshake,
  },
  {
    name: "Regional Level",
    description:
      "Aligns provincial teams within each RCCG region, strengthens communication, and helps ministry activity remain consistent across territories.",
    icon: FaUserFriends,
  },
  {
    name: "Provincial Level",
    description:
      "Drives the active field work through local mobilization, visit planning, welfare response, follow-up, and ministry reporting.",
    icon: FaHandsHelping,
  },
];

const coreValues = [
  "Show the love of Jesus Christ to those who are sick and in prison.",
  "Proclaim liberty to captives and freedom to prisoners.",
  "Go forth, bear fruit, and cause the fruit to abide.",
  "Reach the sick and prisoners with love, care, and compassion.",
];

const identityStats = [
  { value: "2016", label: "National inauguration" },
  { value: "3", label: "Core leadership levels" },
  { value: "Nationwide", label: "Outreach mandate" },
];

const historyLeaders = [
  {
    name: "Late Pastor Abu",
    role: "Originator of the national frontier idea",
    image: historyPastorAbu,
    alt: "Late Pastor Abu portrait panel",
    summary:
      "He first carried the burden that the Prison and Hospital Ministry should move beyond scattered local activity into a national ministry expression.",
  },
  {
    name: "Pastor Rotimi Thomas",
    role: "Coordinator and national advocacy driver",
    image: pastorThomas,
    alt: "Pastor Rotimi Thomas",
    summary:
      "After Pastor Abu's passing, he worked with other coordinators to continue the push for national recognition and formal ministry coordination.",
  },
  {
    name: "Pastor J. F. Odesola",
    role: "National inauguration mandate",
    image: historyPastorOdesola,
    alt: "Pastor J. F. Odesola portrait panel",
    summary:
      "Daddy G.O replied through him and mandated the inauguration of the Prison and Hospital Ministry at national level.",
  },
];

export default function WeAre() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-white">
          <img
            src={pic1}
            alt="RCCG NPHM ministry outreach"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/95 to-amber-50/80" />

          <div className="relative mx-auto grid min-h-[560px] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 shadow-sm backdrop-blur">
                <FaCross className="h-4 w-4" />
                Who We Are
              </p>
              <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                A Ministry Of Care, Outreach, And Restoration.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
                The Prison and Hospital Ministry of RCCG reaches inmates in
                prisons and police stations, patients in hospitals, and people
                in need across Nigeria.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:self-end">
              {identityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white bg-white/85 p-5 text-slate-900 shadow-lg shadow-slate-200/70 backdrop-blur"
                >
                  <p className="text-3xl font-black">{stat.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
                About The Ministry
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Built To Harmonize Compassion Across RCCG
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                The ministry exists to heal the sick, spiritually rehabilitate
                inmates, support people in difficult places, and mobilize RCCG
                parishes for consistent prison and hospital outreach.
              </p>
              <div className="mt-8 rounded-lg border-l-4 border-red-600 bg-slate-50 p-6 shadow-sm">
                <FaQuoteLeft className="mb-4 h-6 w-6 text-red-600" />
                <p className="text-lg font-bold leading-8 text-slate-900">
                  To preach good news, proclaim freedom, share the burden of
                  those who are bound, and provide refuge for restored lives.
                </p>
              </div>
            </div>

            <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200">
              <img
                src={pic2}
                alt="RCCG NPHM ministry fellowship and outreach"
                className="h-[420px] w-full object-cover"
              />
              <figcaption className="border-t border-slate-100 bg-white px-5 py-4 text-sm font-semibold text-slate-600">
                Compassion, coordination, and follow-up across ministry fields.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
                  Our History
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  From Scattered Exploits To A National Ministry Face
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  RCCG Prison and Hospital Ministry had been active in many
                  regions, provinces, and zonal headquarters, but the work
                  needed a national identity, shared structure, and harmonized
                  ministry direction.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-5 text-base leading-8 text-slate-600">
                  <p>
                    Late Pastor Abu first came up with the idea of moving the
                    ministry to national frontiers. After his death, Pastor
                    Rotimi Thomas, the present Vice Chairman of the
                    Coordinators, worked with other coordinators to write to our
                    daddy in the Lord through Pastor J. F. Odesola.
                  </p>
                  <p>
                    Daddy G.O replied and mandated Pastor J. F. Odesola to
                    inaugurate the Prison and Hospital Ministry. This took place
                    under the unction of the Holy Spirit on March 6, 2016, with
                    a mandate to sensitize and establish the ministry in all
                    RCCG parishes nationwide.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {historyLeaders.map((leader) => (
                    <article
                      key={leader.name}
                      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
                    >
                      <div className="aspect-[4/4.6] bg-slate-100">
                        <img
                          src={leader.image}
                          alt={leader.alt}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
                          {leader.role}
                        </p>
                        <h3 className="mt-2 text-xl font-black text-slate-950">
                          {leader.name}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {leader.summary}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
                Vision, Mission, Values
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                The Convictions That Shape The Work
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <FaBullseye className="mb-5 h-8 w-8 text-sky-700" />
                <h3 className="text-xl font-black text-slate-950">
                  Vision And Mission
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  To be a major channel of blessing to those who are sick and in
                  prison, so they can experience quality fellowship with God.
                </p>
              </article>

              <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm lg:col-span-2">
                <FaBookOpen className="mb-5 h-8 w-8 text-red-600" />
                <h3 className="text-xl font-black text-slate-950">Core Values</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {coreValues.map((value) => (
                    <div
                      key={value}
                      className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-700"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-sky-50 py-16 text-slate-900 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
                Ministry Structure
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                National Leadership, Regional Alignment, Provincial Action
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                At national level, the structure focuses on the leadership
                layers that directly coordinate, supervise, and report ministry
                activity: National, Regional, and Provincial.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {ministryData.map((ministry) => (
                <article
                  key={ministry.name}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
                >
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                    <ministry.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-black text-slate-950">
                    {ministry.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {ministry.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-sky-200 bg-white px-5 py-4 text-sm font-semibold leading-7 text-slate-700 shadow-sm">
              <FaPray className="mr-2 inline h-4 w-4 text-sky-700" />
              Parish, Area, and Zonal activity remain important field
              expressions, but this page now presents the national framework at
              the levels most relevant to national coordination.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
