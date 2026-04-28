import React, { useMemo } from "react";
import { getSessionUser } from "../../dashboard/utils/authSession";

const DashboardHeader: React.FC = () => {
  const sessionUser = getSessionUser();

  const firstName = useMemo(() => {
    if (!sessionUser) return "Friend";

    const rawName = sessionUser.name?.trim();
    if (rawName) return rawName.split(" ")[0];

    return "Friend";
  }, [sessionUser]);

  return (
    <section className="mb-6 overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 p-8 text-white shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">
        RCCG NPHM Dashboard
      </p>

      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Welcome Beloved,{" "}
            <span className="inline-block text-cyan-200 animate-pulse">
              {firstName}
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-blue-100 md:text-base">
            Steward the work with clarity, discipline, and beauty. This is your command center.
          </p>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">
            Status
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            Systems ready for execution
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;