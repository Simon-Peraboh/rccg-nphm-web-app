import React from "react";
import { Link } from "react-router-dom";

interface DashboardWidgetCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  subtitle: string;
  link: string;
  trend?: string;
  accent?: string;
}

const DashboardWidgetCard: React.FC<DashboardWidgetCardProps> = ({
  title,
  icon,
  value,
  subtitle,
  link,
  trend,
  accent = "from-blue-600 to-cyan-500",
}) => {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>

          {trend && (
            <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {trend}
            </span>
          )}
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-3xl text-slate-700 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
          View details
        </span>
        <span className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
};

export default DashboardWidgetCard;