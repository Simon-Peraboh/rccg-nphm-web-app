import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { TbFileReport } from "react-icons/tb";
import { RiHeartAddFill } from "react-icons/ri";
import { toast } from "react-toastify";
import DashboardWidgetCard from "./DashboardWidgetCard";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";

const DashboardOverview: React.FC = () => {
  const { data, isLoading, isError, error } = useDashboardMetrics();

  if (isError) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch dashboard metrics";
    toast.error(message);

    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load dashboard metrics.
      </div>
    );
  }

  const currency =
    data?.totalExpenditure?.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }) ?? "Loading...";

  const metrics = [
    {
      id: "members",
      title: "Total Members",
      value: isLoading ? "..." : data?.totalMembers ?? 0,
      subtitle: "Registered members in national database",
      link: "/dashboard/userprofile",
      trend: "Community Growth",
      icon: <FaUserFriends />,
      accent: "from-blue-600 to-sky-400",
    },
    {
      id: "reports",
      title: "Monthly Reports",
      value: isLoading ? "..." : data?.totalMonthlyReports ?? 0,
      subtitle: "Submitted outreach and ministry reports",
      link: "/dashboard/monthlyReportTable",
      trend: "Reporting Activity",
      icon: <TbFileReport />,
      accent: "from-violet-600 to-fuchsia-500",
    },
    {
      id: "expenditure",
      title: "Total Expenditure",
      value: currency,
      subtitle: "Captured across monthly ministry reports",
      link: "/dashboard/monthlyReportTable",
      trend: "Financial Visibility",
      icon: <MdAttachMoney />,
      accent: "from-emerald-600 to-lime-500",
    },
    {
      id: "souls",
      title: "Souls Reached",
      value: isLoading ? "..." : data?.totalSoulsSaved ?? 0,
      subtitle: "Total souls won from submitted reports",
      link: "/dashboard/monthlyReportTable",
      trend: "Kingdom Impact",
      icon: <RiHeartAddFill />,
      accent: "from-rose-600 to-orange-400",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <DashboardWidgetCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            link={metric.link}
            trend={metric.trend}
            icon={metric.icon}
            accent={metric.accent}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Overview
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Ministry Performance Snapshot
              </h2>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Reporting Strength</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {isLoading ? "Loading..." : `${data?.totalMonthlyReports ?? 0} reports`}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Track how actively regions and provinces are documenting ministry work.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Impact Summary</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {isLoading ? "Loading..." : `${data?.totalSoulsSaved ?? 0} souls reached`}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                A quick measure of outreach influence across submitted reports.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                  Top 10 Reporting Provinces
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  Consistency & Reporting Leaders
                </h3>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="py-3 pr-4">Province</th>
                    <th className="py-3 pr-4">Reports</th>
                    <th className="py-3 pr-4">Active Months</th>
                    <th className="py-3 pr-4">Souls Won</th>
                    <th className="py-3">Expenditure</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-500">
                        Loading top provinces...
                      </td>
                    </tr>
                  ) : data?.topReportingProvinces?.length ? (
                    data.topReportingProvinces.map((province, index) => (
                      <tr key={`${province.province}-${index}`} className="border-b border-slate-100">
                        <td className="py-3 pr-4 font-medium text-slate-900">
                          {province.province}
                        </td>
                        <td className="py-3 pr-4 text-slate-700">{province.totalReports}</td>
                        <td className="py-3 pr-4 text-slate-700">{province.activeMonths}</td>
                        <td className="py-3 pr-4 text-slate-700">{province.totalSouls}</td>
                        <td className="py-3 text-slate-700">
                          {province.totalExpenditure.toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            maximumFractionDigits: 0,
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-500">
                        No province reporting data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Focus
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Executive Insight
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Membership
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Keep the national database current and searchable for reporting accuracy.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Finance
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Expenditure visibility should support discipline, not confusion.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Mission
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Souls won and outreach reports are not vanity metrics. They are purpose metrics.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Reporting Provinces
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Highlighting top provinces creates visibility, healthy accountability, and a pattern worth studying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;