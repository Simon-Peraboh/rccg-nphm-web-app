import { Link } from 'react-router-dom';
import { HeartHandshake, Users, ShieldPlus, Cross, Sparkles } from 'lucide-react';
import pic from '../../assets/Images/bayelsa-7.jpg';

const impactItems = [
  { title: 'Prisons', subtitle: 'Visitation' },
  { title: 'Hospitals', subtitle: 'Care' },
  { title: 'Police Stations', subtitle: 'Outreach' },
  { title: 'Care Homes', subtitle: 'Support' },
];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.08),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
              Reaching out with the love of Christ
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Bringing care, hope, and dignity to inmates, patients, and forgotten lives.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              RCCG National Prison and Hospital Ministry serves through visitation,
              encouragement, practical support, advocacy, and Christ-centered restoration
              for people often overlooked by society.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/donation"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <HeartHandshake className="h-4 w-4" />
                Support the Mission
              </Link>

              <Link
                to="/hop-onboard"
                className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Join the Ministry
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {impactItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{item.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-600">
              <div className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span>Compassion-led outreach</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <ShieldPlus className="h-4 w-4 text-blue-600" />
                <span>Restoration-focused care</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Cross className="h-4 w-4 text-blue-600" />
                <span>Christ-centered service</span>
              </div>
            </div>
          </div>

          <div>
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-blue-100 bg-blue-50/60" />
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border border-red-100 bg-red-50/60" />
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-100/70 via-transparent to-red-100/70 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={pic}
                    alt="RCCG National Prison and Hospital Ministry outreach"
                    className="h-full w-full object-cover object-center"
                  />

                  <div className="absolute left-4 top-4 rounded-full border border-white/90 bg-white px-4 py-2 shadow-md">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                        Hope in Action
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-4 bottom-4">
                    <div className="absolute inset-0 rounded-2xl bg-white/35 backdrop-blur-md" />
                    <div className="relative rounded-2xl border border-white/80 bg-white/92 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.18)]">
                      <p className="text-lg font-bold leading-snug text-slate-900">
                        Restoring lives through care, compassion, and consistent visitation.
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        Serving inmates, patients, and vulnerable communities with practical support
                        and the message of Christ.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-t border-slate-200 bg-white px-4 py-4">
                  <div>
                    <p className="text-lg font-bold text-slate-900">Care</p>
                    <p className="text-xs text-slate-500">Practical support</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">Hope</p>
                    <p className="text-xs text-slate-500">Encouragement</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">Faith</p>
                    <p className="text-xs text-slate-500">Restoration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}