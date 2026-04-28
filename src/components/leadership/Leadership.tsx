import React from "react";
import { leader1, leader2, leader3, leader4, leader5 } from "../leadership/index";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

interface Leader {
  name: string;
  description: string;
  image: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  featured?: boolean;
}

const leadersData: Leader[] = [
  {
    name: "Pastor Ariyo Popoola",
    description: "National Chairman",
    image: leader1,
    facebook: "https://facebook.com/ariyo",
    twitter: "https://twitter.com/ariyo",
    linkedin: "https://linkedin.com/in/ariyo",
    featured: true,
  },
  {
    name: "PST Rotimi Thomas",
    description: "National Vice Chairman",
    image: leader5,
    facebook: "https://facebook.com/rotimi",
    twitter: "https://twitter.com/rotimi",
    linkedin: "https://linkedin.com/in/rotimi",
  },
  {
    name: "PST (Mrs) Bukunola",
    description: "National Secretary",
    image: leader4,
    facebook: "https://facebook.com/bukunola",
    twitter: "https://twitter.com/bukunola",
    linkedin: "https://linkedin.com/in/bukunola",
  },
  {
    name: "PST Dele Ajayi",
    description: "National Legal Adviser",
    image: leader2,
    facebook: "https://facebook.com/dele",
    twitter: "https://twitter.com/dele",
    linkedin: "https://linkedin.com/in/dele",
  },
  {
    name: "PST Dele Fadesere",
    description: "National Treasurer",
    image: leader3,
    facebook: "https://facebook.com/fadesere",
    twitter: "https://twitter.com/fadesere",
    linkedin: "https://linkedin.com/in/fadesere",
  },
];

const SocialLinks: React.FC<Pick<Leader, "facebook" | "twitter" | "linkedin" | "name">> = ({
  facebook,
  twitter,
  linkedin,
  name,
}) => {
  const links = [
    facebook && {
      href: facebook,
      label: `${name} Facebook`,
      icon: <FaFacebookF className="h-4 w-4" />,
    },
    twitter && {
      href: twitter,
      label: `${name} Twitter`,
      icon: <FaTwitter className="h-4 w-4" />,
    },
    linkedin && {
      href: linkedin,
      label: `${name} LinkedIn`,
      icon: <FaLinkedinIn className="h-4 w-4" />,
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  if (!links.length) return null;

  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

const Leadership: React.FC = () => {
  const chairman = leadersData.find((leader) => leader.featured);
  const council = leadersData.filter((leader) => !leader.featured);

  if (!chairman) return null;

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.06),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-sm">
            Leadership Structure
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Leadership seated with vision, order, and responsibility.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            A leadership structure shaped for guidance, accountability, and faithful
            stewardship of the ministry’s national mission.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="mx-auto h-6 max-w-5xl rounded-full bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-80" />

          <div className="relative mx-auto mt-2 max-w-2xl">
            <div className="absolute inset-0 rounded-[2.5rem] bg-blue-100/40 blur-2xl" />

            <article className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white px-6 py-8 text-center shadow-[0_28px_70px_rgba(15,23,42,0.10)] sm:px-8">
              <div className="mx-auto w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.20em] text-blue-700">
                Head of Table
              </div>

              <div className="relative mx-auto mt-6 w-fit">
                <div className="absolute inset-0 rounded-full bg-blue-100/70 blur-2xl" />
                <img
                  src={chairman.image}
                  alt={chairman.name}
                  className="relative h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg sm:h-48 sm:w-48"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {chairman.name}
              </h3>

              <p className="mt-3 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                {chairman.description}
              </p>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Providing national oversight, spiritual direction, and leadership stability
                for the ministry’s outreach to prisons, hospitals, and vulnerable communities.
              </p>

              <SocialLinks
                name={chairman.name}
                facebook={chairman.facebook}
                twitter={chairman.twitter}
                linkedin={chairman.linkedin}
              />
            </article>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {council.map((leader, index) => (
              <article
                key={leader.name}
                className={`group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  index === 0
                    ? "xl:translate-y-6"
                    : index === 1
                    ? "xl:translate-y-2"
                    : index === 2
                    ? "xl:translate-y-2"
                    : "xl:translate-y-6"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-100/60 blur-xl" />
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="relative h-32 w-32 rounded-full border-4 border-white object-cover shadow-md sm:h-36 sm:w-36"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
                    {leader.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {leader.description}
                  </p>

                  <SocialLinks
                    name={leader.name}
                    facebook={leader.facebook}
                    twitter={leader.twitter}
                    linkedin={leader.linkedin}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 h-3 max-w-5xl rounded-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-70" />
        </div>
      </div>
    </section>
  );
};

export default Leadership;