import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { conf1, conf2, conf3, conf4, conf5, conf6 } from "../conference/index";

interface ConferenceEdition {
  id: string;
  src: string;
  edition: string;
  date: string;
  theme: string;
  summary: string;
}

const maidenEdition = {
  src: conf1,
  edition: "Maiden Edition",
  date: "May 1st, 2018",
  theme: "From Hopelessness to Glory",
  summary:
    "The inaugural conference edition that established the ministry’s conference identity and marked the beginning of a defining journey of hope, restoration, and gospel impact.",
};

const rotatingEditions: ConferenceEdition[] = [
  {
    id: "conf-2",
    src: conf2,
    edition: "2nd Edition",
    date: "May 1st, 2019",
    theme: "Reigning In Everlasting Dominion",
    summary:
      "A conference expression centered on spiritual authority, kingdom influence, and victorious ministry among inmates and workers.",
  },
  {
    id: "conf-3",
    src: conf3,
    edition: "3rd Edition",
    date: "May 4th, 2022",
    theme: "Fresh Air For Freedom",
    summary:
      "A renewed call to liberation, healing, and Christ-centered transformation in custodial and hospital ministry spaces.",
  },
  {
    id: "conf-4",
    src: conf4,
    edition: "4th Edition",
    date: "April 29th, 2023",
    theme: "Wonders Of Freedom",
    summary:
      "An edition that emphasized the miraculous possibilities of freedom, restoration, and divine intervention in forgotten lives.",
  },
  {
    id: "conf-5",
    src: conf5,
    edition: "5th Edition",
    date: "June 1st, 2024",
    theme: "Wind Of Divine Repositioning",
    summary:
      "A prophetic emphasis on divine movement, fresh alignment, and new placement in ministry purpose and impact.",
  },
  {
    id: "conf-6",
    src: conf6,
    edition: "6th Edition",
    date: "May 31st, 2025",
    theme: "Divine Landmark",
    summary:
      "A defining edition marking visible growth, spiritual milestones, and the evidence of God’s hand upon the ministry.",
  },
];

const AUTO_PLAY_MS = 6000;
const PROGRESS_INTERVAL_MS = 80;

const Conference: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentEdition = useMemo(
    () => rotatingEditions[currentIndex],
    [currentIndex]
  );

  useEffect(() => {
    const progressStep = 100 / (AUTO_PLAY_MS / PROGRESS_INTERVAL_MS);

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressStep;
        return next >= 100 ? 100 : next;
      });
    }, PROGRESS_INTERVAL_MS);

    const slideTimer = window.setTimeout(() => {
      triggerSlideChange((prev) =>
        prev === rotatingEditions.length - 1 ? 0 : prev + 1
      );
    }, AUTO_PLAY_MS);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(slideTimer);
    };
  }, [currentIndex]);

  const triggerSlideChange = (getNextIndex: (prev: number) => number) => {
    setIsTransitioning(true);

    window.setTimeout(() => {
      setCurrentIndex((prev) => getNextIndex(prev));
      setProgress(0);

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 120);
    }, 220);
  };

  const goNext = () => {
    triggerSlideChange((prev) =>
      prev === rotatingEditions.length - 1 ? 0 : prev + 1
    );
  };

  const goPrev = () => {
    triggerSlideChange((prev) =>
      prev === 0 ? rotatingEditions.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    triggerSlideChange(() => index);
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0">
        <img
          src={maidenEdition.src}
          alt={`${maidenEdition.edition} - ${maidenEdition.theme}`}
          className="h-full w-full scale-110 object-cover object-center opacity-15 blur-[8px]"
        />
        <div className="absolute inset-0 bg-white/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.05),transparent_28%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-blue-100 bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-sm backdrop-blur-sm">
            Conference Journey
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            One foundation. Many prophetic editions.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            The maiden edition remains the historic foundation, while each
            subsequent conference unfolds as a living continuation of the
            ministry’s vision, voice, and impact.
          </p>

          <div className="mx-auto mt-8 max-w-3xl rounded-[30px] border border-white/90 bg-white/85 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Foundation Edition
            </p>

            <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {maidenEdition.edition}
            </h3>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{maidenEdition.date}</span>
            </div>

            <p className="mt-4 text-lg font-medium text-blue-700">
              Theme: {maidenEdition.theme}
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              {maidenEdition.summary}
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl sm:mt-20">
          <div className="absolute left-1/2 top-[-58px] h-14 w-[2px] -translate-x-1/2 rounded-full bg-slate-300/90" />
          <div className="absolute left-1/2 top-[-18px] h-7 w-32 -translate-x-1/2 rounded-full border border-slate-300/80 bg-white/85 shadow-sm backdrop-blur-sm" />
          <div className="absolute left-1/2 top-[-8px] h-2 w-16 -translate-x-1/2 rounded-full bg-slate-300/80" />

          <div className="absolute -inset-8 rounded-[3rem] bg-blue-100/30 blur-3xl" />

          <div className="conference-tablet relative origin-top overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-900/88 shadow-[0_28px_70px_rgba(15,23,42,0.18)] backdrop-blur-md">
            <div className="conference-tablet-shadow absolute inset-x-10 bottom-[-28px] h-12 rounded-full bg-slate-900/18 blur-2xl" />

            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100/80">
                  Subsequent Editions
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  Rotating conference showcase
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous conference edition"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next conference edition"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="px-4 pt-3 sm:px-5">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/65">
                <span>Timeline playback</span>
                <span>
                  {currentIndex + 1} / {rotatingEditions.length}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white transition-[width] duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-900/40">
                <div className="relative h-[300px] overflow-hidden sm:h-[400px] lg:h-[460px]">
                  <img
                    src={currentEdition.src}
                    alt={`${currentEdition.edition} - ${currentEdition.theme}`}
                    className={`h-full w-full object-cover object-center transition-all duration-500 ${
                      isTransitioning
                        ? "translate-y-3 scale-[1.03] opacity-0"
                        : "translate-y-0 scale-100 opacity-100"
                    }`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 right-4 rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    Playing timeline
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 sm:p-6 ${
                      isTransitioning
                        ? "translate-y-4 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>{currentEdition.date}</span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                      {currentEdition.edition}
                    </h3>

                    <p className="mt-2 text-lg font-medium text-blue-100">
                      Theme: {currentEdition.theme}
                    </p>
                  </div>
                </div>

                <div className="bg-white/95 px-5 py-5 text-slate-900 sm:px-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                    Edition Insight
                  </p>

                  <p
                    className={`mt-3 text-sm leading-7 text-slate-600 transition-all duration-500 sm:text-base ${
                      isTransitioning
                        ? "translate-y-3 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    {currentEdition.summary}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {rotatingEditions.map((edition, index) => (
                  <button
                    key={edition.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Show ${edition.edition}`}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                      currentIndex === index
                        ? "bg-white text-slate-900"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {edition.edition}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                {rotatingEditions.map((edition, index) => (
                  <button
                    key={edition.id}
                    type="button"
                    aria-label={`Go to ${edition.edition}`}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentIndex === index
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes conferenceTabletFloat {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-7px) rotate(-0.25deg);
            }
          }

          @keyframes conferenceTabletShadow {
            0%, 100% {
              opacity: 0.22;
              transform: scaleX(1);
            }
            50% {
              opacity: 0.14;
              transform: scaleX(0.92);
            }
          }

          .conference-tablet {
            animation: conferenceTabletFloat 5.8s ease-in-out infinite;
          }

          .conference-tablet-shadow {
            animation: conferenceTabletShadow 5.8s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Conference;