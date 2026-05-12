import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import SectionContainer from "../layout/SectionContainer";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://facebook.com/rccgphm",
      label: "Facebook",
      icon: <FaFacebookF className="h-4 w-4" />,
    },
    {
      href: "https://twitter.com/rccgphm",
      label: "Twitter",
      icon: <FaTwitter className="h-4 w-4" />,
    },
    {
      href: "https://linkedin.com/company/rccgphm",
      label: "LinkedIn",
      icon: <FaLinkedinIn className="h-4 w-4" />,
    },
    {
      href: "https://youtube.com/@rccgphm",
      label: "YouTube",
      icon: <FaYoutube className="h-4 w-4" />,
    },
    {
      href: "https://instagram.com/rccgphm",
      label: "Instagram",
      icon: <FaInstagram className="h-4 w-4" />,
    },
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Who We Are", to: "/WeAre" },
    { label: "In Action", to: "/InAction" },
    { label: "Conference", to: "/Conference" },
  ];

  const ministryLinks = [
    { label: "Connect", to: "/Connect" },
    { label: "Report", to: "/Report" },
    { label: "Contact Us", to: "/Contact" },
    { label: "HopOnboard", to: "/dashboard/register" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white text-slate-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.05),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.04),transparent_22%)]" />

      <SectionContainer>
        <div className="flex flex-col gap-5 border-b border-slate-200 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              Stay Connected
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Follow the ministry and stay informed on outreach, conferences, and impact stories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:text-blue-700 hover:shadow-md"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              RCCG NPHM
            </h3>
            <p className="mt-4 max-w-sm text-base leading-8 text-slate-600">
              An arm of RCCG committed to outreach and care for inmates in prisons,
              police stations, hospitals, and old people’s homes across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900">
              Quick Links
            </h4>
            <div className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block text-sm text-slate-600 transition hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900">
              Ministry Access
            </h4>
            <div className="mt-5 space-y-3">
              {ministryLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block text-sm text-slate-600 transition hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/donation"
                className="block text-sm font-semibold text-red-600 transition hover:text-red-700"
              >
                Donate
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900">
              Contact
            </h4>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 shadow-sm text-blue-700">
                  <HiOutlineLocationMarker className="h-5 w-5" />
                </span>
                <p className="text-sm leading-7 text-slate-600">
                  Redemption City, Lagos-Ibadan Expressway, Nigeria
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 shadow-sm text-blue-700">
                  <HiOutlineMail className="h-5 w-5" />
                </span>
                <a
                  href="mailto:prisonandhosp@rccgph.org"
                  className="text-sm text-slate-600 transition hover:text-blue-700"
                >
                  prisonandhosp@rccgph.org
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 shadow-sm text-blue-700">
                  <HiOutlinePhone className="h-5 w-5" />
                </span>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>+234 8034886673</p>
                  <p>WhatsApp: +234 8034886673</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} RCCG NPHM. All rights reserved.</p>
          <p>Reaching out with the love of Christ.</p>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;