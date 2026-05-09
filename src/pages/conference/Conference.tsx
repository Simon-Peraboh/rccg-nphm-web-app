import { Link } from "react-router-dom";
import { Footer, Header } from "../../components";
import ConferenceCard from "./ConferenceCards";
import { cardData } from "./data";
<<<<<<< HEAD
import confereFlyer from "../../assets/Images/conf26.jpeg";
=======
import confereFlyer from "../../assets/Images/nphm conf2026.jpeg";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

function Conference() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="px-6 py-14">
          <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                  RCCG NPHM Conference
                </p>

                <h1 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                  One place for conference registration and access
                </h1>

                <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                  Register for the conference, log in as a member, or access the admin panel —
                  all from one clear entry point.
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  to="/ConferenceRegistration"
                  className="rounded-2xl bg-blue-600 px-5 py-4 text-white font-semibold text-center shadow-sm hover:bg-blue-700 transition"
                >
                  Register
                </Link>

                <Link
                  to="/dashboardconference/login"
                  className="rounded-2xl bg-green-600 px-5 py-4 text-white font-semibold text-center shadow-sm hover:bg-green-700 transition"
                >
                  Member Login
                </Link>

                <Link
                  to="/dashboardconference/admin-login"
                  className="rounded-2xl bg-slate-800 px-5 py-4 text-white font-semibold text-center shadow-sm hover:bg-slate-900 transition"
                >
                  Admin Login
                </Link>
              </div>

              {/* SMALL INFO CARDS */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase text-slate-500">For New Attendees</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Register and receive your conference code.
                  </p>
                </div>

                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase text-slate-500">For Returning Members</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Log in with your current conference code and password.
                  </p>
                </div>

                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase text-slate-500">For Admins</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Approve attendance and manage conference records.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FLYER */}
            <div className="rounded-[28px] overflow-hidden border bg-white shadow-sm">
              <img
                src={confereFlyer}
                alt="Conference Flyer"
                className="w-full h-full object-cover min-h-[320px] max-h-[620px]"
              />
            </div>
          </div>
        </section>

        {/* EXISTING CONFERENCE CARDS */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Conference Highlights
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Explore conference information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {cardData.map(({ title, img, number }) => (
                <ConferenceCard
                  key={number}
                  title={title}
                  img={img}
                  number={number}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Conference;