<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Footer, Header } from "../../components";
import { pic6, pic5 } from './index'
=======
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaChurch,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaNetworkWired,
  FaTwitter,
  FaUsers,
} from "react-icons/fa";
import { Footer, Header } from "../../components";
import { pic6, pic5 } from "./index";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

interface Coordinator {
  id: number;
  full_name: string;
  province: string;
  state: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  image_path?: string;
<<<<<<< HEAD
}

=======
  image_url?: string;
}

const fallbackCoordinatorImage = pic5;
const apiBaseUrl = (import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api").replace(/\/api\/?$/, "");
const stateCoordinatorsUrl = `${apiBaseUrl}/api/stateCoordinators/getAll`;

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
export default function Connect() {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
<<<<<<< HEAD
      .get("https://app2.rccgphm.org/api/stateCoordinators/getAll")
=======
      .get(stateCoordinatorsUrl)
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
      .then((res) => {
        setCoordinators(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading coordinators", err);
        setLoading(false);
      });
  }, []);

<<<<<<< HEAD
  const grouped = coordinators.reduce((acc: Record<string, Coordinator[]>, user) => {
    if (!acc[user.state]) acc[user.state] = [];
    acc[user.state].push(user);
    return acc;
  }, {});

  return (
    <div className="bg-blue-200">
      <Header />

      <section className="py-8 md:py-12">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Connect with Us In Every State</h1>
            <p className="text-gray-700">
              Join our network of dedicated volunteers and partners across Nigeria.
            </p>
          </div>
          <div className="md:w-1/2 p-1">
            <img
              src={pic6}
              alt="Connect Hero"
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>


      {/* Coordinators by state */}
      <section className="py-8 md:py-12 bg-blue-200">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-blue-600 font-semibold">Loading coordinators...</p>
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="text-center py-12 text-gray-600">No Data From Server Found.</div>
          ) : (
            Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([state, group]) => (
                <div key={state} className="mb-10">
                  <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">
                    {state} State Coordinators
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {group.map((coordinator) => (
                      <div key={coordinator.id} className="text-center bg-white p-4 rounded-lg shadow-md">
                        <img
                          src={`https://app2.rccgphm.org/storage/${coordinator.image_path}`}
                          onError={(e) => (e.currentTarget.src = pic5)}
                          alt={coordinator.full_name}
                          className="w-24 h-32 object-cover rounded-lg mx-auto mb-2"
                        />
                        <h3 className="text-lg font-semibold">{coordinator.full_name}</h3>
                        <p className="text-gray-600">{coordinator.province}</p>
                        <div className="mt-2 flex justify-center space-x-2 text-blue-600">
                          {coordinator.facebook && (
                            <a href={coordinator.facebook} target="_blank" rel="noopener noreferrer">
                              <FaFacebook />
                            </a>
                          )}
                          {coordinator.twitter && (
                            <a href={coordinator.twitter} target="_blank" rel="noopener noreferrer">
                              <FaTwitter />
                            </a>
                          )}
                          {coordinator.instagram && (
                            <a href={coordinator.instagram} target="_blank" rel="noopener noreferrer">
                              <FaInstagram />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
        <Footer />
      </section>

    </div>
  )
=======
  const grouped = useMemo(
    () =>
      coordinators.reduce((acc: Record<string, Coordinator[]>, user) => {
        const state = user.state || "Unassigned";

        if (!acc[state]) acc[state] = [];
        acc[state].push(user);

        return acc;
      }, {}),
    [coordinators]
  );

  const stateGroups = useMemo(
    () => Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)),
    [grouped]
  );

  const provinceCount = useMemo(
    () => new Set(coordinators.map((item) => item.province).filter(Boolean)).size,
    [coordinators]
  );

  const summaryCards = [
    {
      label: "States Covered",
      value: stateGroups.length || "--",
      icon: FaMapMarkerAlt,
      tone: "text-sky-700 bg-sky-100",
    },
    {
      label: "Coordinators",
      value: coordinators.length || "--",
      icon: FaUsers,
      tone: "text-emerald-700 bg-emerald-50",
    },
    {
      label: "Provinces",
      value: provinceCount || "--",
      icon: FaChurch,
      tone: "text-amber-700 bg-amber-50",
    },
  ];

  const coordinatorImage = (coordinator: Coordinator) => {
    const imagePath = (coordinator.image_url || coordinator.image_path || "").trim();

    if (!imagePath) return fallbackCoordinatorImage;

    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    const normalizedPath = imagePath
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")
      .replace(/^public\//, "")
      .replace(/^storage\//, "");

    return `${apiBaseUrl}/storage/${normalizedPath}`;
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-white">
          <img
            src={pic6}
            alt="Map of Nigeria"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/95 to-teal-50/85" />

          <div className="relative mx-auto grid min-h-[520px] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 shadow-sm backdrop-blur">
                <FaNetworkWired className="h-4 w-4" />
                National Network
              </p>
              <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Connect with RCCG NPHM in every state.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
                Find ministry coordinators across Nigeria and stay connected
                with outreach teams serving prisons, hospitals, police stations,
                and communities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:self-end">
              {summaryCards.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white bg-white/85 p-5 text-slate-900 shadow-lg shadow-slate-200/70 backdrop-blur"
                >
                  <span
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg ${item.tone}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="text-3xl font-black">{item.value}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
                  Ministry Presence
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  A coordinated ministry presence across Nigeria
                </h2>
              </div>
              <p className="text-base leading-8 text-slate-600">
                Each state group below brings coordinators into one clear view,
                making it easier to identify the closest ministry contact and
                follow their public channels where available.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="min-h-72 animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mx-auto h-32 w-28 rounded-lg bg-slate-200" />
                    <div className="mx-auto mt-5 h-4 w-3/4 rounded bg-slate-200" />
                    <div className="mx-auto mt-3 h-3 w-1/2 rounded bg-slate-100" />
                    <div className="mx-auto mt-5 h-8 w-28 rounded-full bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : stateGroups.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                <FaUsers className="mx-auto h-10 w-10 text-slate-400" />
                <h2 className="mt-5 text-2xl font-black text-slate-950">
                  No coordinators are available yet.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                  Coordinator records will appear here once the server provides
                  the latest state network data.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {stateGroups.map(([state, group]) => (
                  <section key={state} className="scroll-mt-24">
                    <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
                          State Network
                        </p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                          {state} State Coordinators
                        </h2>
                      </div>
                      <p className="text-sm font-semibold text-slate-500">
                        {group.length} {group.length === 1 ? "contact" : "contacts"}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                      {group.map((coordinator) => (
                        <article
                          key={coordinator.id}
                          className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
                        >
                          <div className="relative mx-auto h-36 w-28 overflow-hidden rounded-lg bg-slate-100">
                            <img
                              src={coordinatorImage(coordinator)}
                              onError={(e) => {
                                e.currentTarget.src = fallbackCoordinatorImage;
                              }}
                              alt={coordinator.full_name}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="mt-4 text-center">
                            <h3 className="text-base font-black leading-6 text-slate-950">
                              {coordinator.full_name}
                            </h3>
                            <p className="mt-1 text-sm font-semibold text-sky-700">
                              {coordinator.province || "Province not listed"}
                            </p>
                          </div>

                          {(coordinator.facebook ||
                            coordinator.twitter ||
                            coordinator.instagram) && (
                            <div className="mt-4 flex justify-center gap-2">
                              {coordinator.facebook && (
                                <a
                                  href={coordinator.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${coordinator.full_name} on Facebook`}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-700 transition hover:bg-sky-600 hover:text-white"
                                >
                                  <FaFacebook className="h-4 w-4" />
                                </a>
                              )}
                              {coordinator.twitter && (
                                <a
                                  href={coordinator.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${coordinator.full_name} on Twitter`}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-700 transition hover:bg-sky-600 hover:text-white"
                                >
                                  <FaTwitter className="h-4 w-4" />
                                </a>
                              )}
                              {coordinator.instagram && (
                                <a
                                  href={coordinator.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${coordinator.full_name} on Instagram`}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-700 transition hover:bg-rose-600 hover:text-white"
                                >
                                  <FaInstagram className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
}
