import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaHandHoldingHeart,
  FaPrayingHands,
  FaUniversity,
} from "react-icons/fa";
import { HeartHandshake } from "lucide-react";
import { Footer, Header } from "../../components";
import Carousel from "../../components/carousel/Carousel2";
import {
  pic7,
  pic8,
  pic9,
  pic10,
  pic11,
  pic12,
  pic14,
} from "../../components/carousel/index";
import BankDetails from "../../components/bankdetails/BankDetails";

const projectImages = [
  { src: pic14, caption: "Halfway Home Project financial support" },
  { src: pic11, caption: "Prison chapel renovation support project" },
  { src: pic10, caption: "Medication support" },
  { src: pic7, caption: "NECO, GCE and Open University education support" },
  { src: pic9, caption: "Raw food bank support" },
  { src: pic12, caption: "Clean new and fairly used clothing support" },
  { src: pic8, caption: "Pro bono legal support" },
];

const givingHighlights = [
  {
    title: "Relief That Reaches",
    text: "Your gift supports food, medication, education, legal care, and reintegration for vulnerable people.",
    icon: FaHandHoldingHeart,
  },
  {
    title: "Accountable Channels",
    text: "Give directly through verified ministry accounts dedicated to outreach and project support.",
    icon: FaUniversity,
  },
  {
    title: "Restoration In Motion",
    text: "Every donation strengthens visitation, care, and practical follow-up across ministry locations.",
    icon: FaPrayingHands,
  },
];

const quickImpacts = [
  "Medication and hospital care support",
  "Education and exam sponsorship",
  "Food, clothing, and welfare packs",
  "Legal and rehabilitation assistance",
];

function Donation() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-white">
          <img
            src={pic14}
            alt="RCCG NPHM outreach support"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/95 to-rose-50/85" />

          <div className="relative mx-auto grid min-h-[560px] w-full max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 shadow-sm backdrop-blur">
                <HeartHandshake className="h-4 w-4" />
                Giving With Purpose
              </p>
              <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Fund Urgent Care, Restoration, And Second Chances.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
                Partner with RCCG Prison and Hospital Ministry to reach inmates,
                patients, and vulnerable people with practical help and the love
                of Christ.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#bank-details"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition hover:-translate-y-0.5 hover:bg-red-700"
                >
                  Give Now
                  <HeartHandshake className="h-4 w-4" />
                </a>
                <Link
                  to="/Connect"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700"
                >
                  Talk To The Team
                  <FaArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {quickImpacts.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white bg-white/80 p-4 text-slate-800 shadow-lg shadow-slate-200/60 backdrop-blur"
                >
                  <FaCheckCircle className="mb-3 h-5 w-5 text-emerald-600" />
                  <p className="text-sm font-semibold leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-10">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            {givingHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
              >
                <item.icon className="mb-5 h-8 w-8 text-sky-700" />
                <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
                Priority Projects
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Projects That Urgently Need Kind Donations
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                These are active support channels for welfare, education,
                medical help, chapel renovation, legal care, and reintegration.
              </p>
            </div>

            <Carousel images={projectImages} />

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {projectImages.slice(0, 4).map((project) => (
                <article
                  key={project.caption}
                  className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <img
                    src={project.src}
                    alt={project.caption}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <p className="text-sm font-bold leading-6 text-slate-900">
                      {project.caption}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="bank-details" className="bg-white py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
                  Secure Giving Channels
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Verified Ministry Giving Accounts
                </h2>
              </div>
              <p className="text-base leading-8 text-slate-600">
                Choose a local Naira account or request the current foreign
                currency details for USD, GBP, EUR, and other transfer channels.
              </p>
            </div>

            <BankDetails />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Donation;
