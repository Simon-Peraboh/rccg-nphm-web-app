<<<<<<< HEAD
//import { Link } from "react-router-dom";
import { Footer, Header } from "../../components";



export default function Report() {

  // const handleLinkClick = (): void => {
  // };

  return (
    <div className="p-2">
       <Header />
       <h1 className="text-4xl text-center text">Quarterly Report</h1>

       {/* <button>
        <button>
        <Link to="/dashboard/conferenceTable" className="flex items-center ml-2 space-x-2 bg-gray-400 hover:bg-green-500 p-2 rounded" onClick={handleLinkClick}>Registered Users</Link>
        </button>
        <br></br>
        <button>
        <Link to="/dashboard/attendanceAdmin" className="flex items-center ml-2 space-x-2 bg-yellow-300 hover:bg-green-500 p-2 rounded" onClick={handleLinkClick}>Attendance Admin</Link>
        </button>
       </button> */}
       <Footer />
    </div>
  )
=======
import { useMemo } from "react";
import { FaCalendarAlt, FaChartLine, FaCoins, FaUsers } from "react-icons/fa";
import { Footer, Header } from "../../components";
import { useQuarterlyReports } from "../../dashboard/hooks/useQuarterlyReport";
import type { QuarterlyReportDTO } from "../../dashboard/types/quarterlyReport";

const parseNumber = (value?: string) => {
  if (!value) return 0;
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 });

const formatCurrency = (value?: string) => {
  const amount = parseNumber(value);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const sortReports = (reports: QuarterlyReportDTO[]) =>
  [...reports].sort((a, b) => {
    const yearA = Number(a.whichYear) || 0;
    const yearB = Number(b.whichYear) || 0;

    if (yearA !== yearB) return yearB - yearA;

    return String(b.period).localeCompare(String(a.period));
  });

export default function Report() {
  const { data, isLoading, isError } = useQuarterlyReports();

  const reports = useMemo(() => sortReports(data ?? []), [data]);
  const totalSouls = useMemo(
    () => reports.reduce((sum, report) => sum + parseNumber(report.totalSouls), 0),
    [reports]
  );
  const totalAmount = useMemo(
    () => reports.reduce((sum, report) => sum + parseNumber(report.totalAmount), 0),
    [reports]
  );
  const latestReport = reports[0];

  const stats = [
    {
      label: "Reports Published",
      value: formatNumber(reports.length),
      icon: FaChartLine,
    },
    {
      label: "Total Souls Reached",
      value: formatNumber(totalSouls),
      icon: FaUsers,
    },
    {
      label: "Total Giving Reported",
      value: formatCurrency(String(totalAmount)),
      icon: FaCoins,
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900">
      <Header />

      <main>
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                  Quarterly Reports
                </p>
                <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Ministry impact, quarter by quarter.
                </h1>
              </div>
              <p className="text-base leading-8 text-slate-600 sm:text-lg">
                This report page now pulls live quarterly report records from
                the ministry API and summarizes souls reached, reported giving,
                and published reporting periods.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-36 animate-pulse rounded-lg bg-white shadow-sm"
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-lg border border-red-100 bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-black text-slate-950">
                  Quarterly reports could not be loaded.
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Please check the server connection and try again.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  {stats.map((stat) => (
                    <article
                      key={stat.label}
                      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                        <stat.icon className="h-5 w-5" />
                      </span>
                      <p className="mt-5 text-3xl font-black text-slate-950">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {stat.label}
                      </p>
                    </article>
                  ))}
                </div>

                {latestReport && (
                  <div className="mt-6 rounded-lg border border-sky-100 bg-sky-50 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                          Latest Report
                        </p>
                        <h2 className="mt-2 text-2xl font-black text-slate-950">
                          {latestReport.period}, {latestReport.whichYear}
                        </h2>
                      </div>
                      <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <FaCalendarAlt className="text-sky-700" />
                        {formatDate(latestReport.creationDate)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 p-5">
                    <h2 className="text-2xl font-black text-slate-950">
                      Report Records
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Live data from the quarterly report API.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-separate border-spacing-0">
                      <thead>
                        <tr className="bg-slate-50 text-left text-sm text-slate-500">
                          <th className="px-5 py-4">SN</th>
                          <th className="px-5 py-4">Year</th>
                          <th className="px-5 py-4">Period</th>
                          <th className="px-5 py-4">Total Souls</th>
                          <th className="px-5 py-4">Total Amount</th>
                          <th className="px-5 py-4">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map((report, index) => (
                          <tr
                            key={report.id ?? `${report.whichYear}-${report.period}`}
                            className="border-b border-slate-100"
                          >
                            <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                              {index + 1}
                            </td>
                            <td className="px-5 py-4 font-bold text-slate-900">
                              {report.whichYear}
                            </td>
                            <td className="px-5 py-4 text-slate-700">
                              {report.period}
                            </td>
                            <td className="px-5 py-4 font-semibold text-slate-900">
                              {formatNumber(parseNumber(report.totalSouls))}
                            </td>
                            <td className="px-5 py-4 font-semibold text-slate-900">
                              {formatCurrency(report.totalAmount)}
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                              {formatDate(report.creationDate)}
                            </td>
                          </tr>
                        ))}

                        {reports.length === 0 && (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-5 py-12 text-center text-slate-500"
                            >
                              No quarterly reports are available yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
}
