import React, { useState } from "react";
import axios from "axios";
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Footer, Header } from "../../components";
import { dashboardApi } from "../../dashboard/lib/axios";
import HeroImage from "../../assets/Images/ijebu_visit.jpg";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  ministryArea: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  ministryArea: "General enquiry",
  subject: "",
  message: "",
};

const phoneNumbers = ["+234 803 491 4638", "+234 803 488 6673", "+234 803 722 5687"];
const emailAddresses = ["prisonandhosp@rccgph.org", "nphministry@yahoo.com"];
const whatsappNumber = "+234 708 422 2323";

const contactCards = [
  {
    label: "Call",
    value: phoneNumbers[0],
    detail: "National office line",
    href: "tel:+2348034914638",
    icon: FaPhoneAlt,
    tone: "bg-sky-50 text-sky-700",
  },
  {
    label: "Email",
    value: emailAddresses[0],
    detail: "Official ministry mailbox",
    href: `mailto:${emailAddresses[0]}`,
    icon: FaEnvelope,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "WhatsApp",
    value: whatsappNumber,
    detail: "Fast response channel",
    href: "https://wa.me/2347084222323",
    icon: FaWhatsapp,
    tone: "bg-green-50 text-green-700",
  },
  {
    label: "Visit",
    value: "Redemption City",
    detail: "KM 46 Lagos-Ibadan Expressway",
    href: "https://maps.google.com/?q=Redemption%20City%20Lagos-Ibadan%20Expressway%20Ogun%20State",
    icon: FaMapMarkerAlt,
    tone: "bg-amber-50 text-amber-700",
  },
];

const ministryAreas = [
  "General enquiry",
  "Prison outreach",
  "Hospital visitation",
  "Police station outreach",
  "Old people's home outreach",
  "Donation and support",
  "Conference",
];

const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.response?.data?.error || "Message could not be sent.";
  }

  if (error instanceof Error) return error.message;

  return "Message could not be sent.";
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError("");
    setSuccessMessage("");
    setSubmitted(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError("Name, email, and message are required.");
      return;
    }

    setSubmitting(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const response = await dashboardApi.post<{ message?: string }>("/public/contact-message", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        ministry_area: form.ministryArea,
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setSubmitted(true);
      setSuccessMessage(response.data.message || "Your message has been sent successfully.");
      setForm(initialForm);
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <Header />

      <main>
        <section className="relative isolate min-h-[520px] overflow-hidden bg-slate-950">
          <img
            src={HeroImage}
            alt="RCCG NPHM outreach team at a correctional centre"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60" />

          <div className="relative mx-auto flex min-h-[520px] w-full max-w-7xl flex-col justify-end px-4 py-14 sm:px-6 lg:px-8">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
              Contact RCCG NPHM
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Reach the ministry team for support, partnership, and field coordination.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
              Connect with the national office for prison, hospital, police station,
              old people's home, conference, and donation enquiries.
            </p>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {contactCards.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${item.tone}`}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 break-words text-base font-black text-slate-950">
                  {item.value}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-16">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                  Send A Message
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  Tell us how we can help.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-slate-700">
                    Phone
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(event) => updateForm("phone", event.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="ministryArea"
                    className="mb-1.5 block text-sm font-bold text-slate-700"
                  >
                    Ministry Area
                  </label>
                  <select
                    id="ministryArea"
                    value={form.ministryArea}
                    onChange={(event) => updateForm("ministryArea", event.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  >
                    {ministryAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Subject
                </label>
                <input
                  id="subject"
                  value={form.subject}
                  onChange={(event) => updateForm("subject", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={7}
                  value={form.message}
                  onChange={(event) => updateForm("message", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm leading-7 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {formError && (
                <p className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {formError}
                </p>
              )}

              {submitted && (
                <p className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
                <FaArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="space-y-5">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <HiOutlineOfficeBuilding className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
                  National Office
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  National Office, Redemption City, KM 46 Lagos-Ibadan Expressway,
                  Ogun State, Nigeria.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                  <FaClock className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
                  Response Desk
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <p>General enquiries: Monday to Friday, 9:00 AM to 5:00 PM.</p>
                  <p>Urgent field matters: call or WhatsApp the national line.</p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  Direct Lines
                </h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block transition hover:text-sky-700"
                    >
                      {phone}
                    </a>
                  ))}
                  {emailAddresses.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block transition hover:text-sky-700"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
