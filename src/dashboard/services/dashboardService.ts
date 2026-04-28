import {
  fetchNationalMonthlyReportAPICall,
  fetchTotalMembersAPICall,
} from "./monthlyReportService";
import type { MonthlyReportDTO } from "../types/monthlyReport";
import type {
  DashboardMetricsResponse,
  TopReportingProvince,
} from "../types/dashboard";

const parseNumericValue = (value: string | number | undefined | null): number => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const parsed = parseFloat(String(value ?? "0").replace(/[^0-9.]/g, "").trim());
  return Number.isNaN(parsed) ? 0 : parsed;
};

type ProvinceAccumulator = {
  province: string;
  totalReports: number;
  totalSouls: number;
  totalExpenditure: number;
  months: Set<string>;
};

const buildTopReportingProvinces = (
  reports: MonthlyReportDTO[]
): TopReportingProvince[] => {
  const provinceMap = new Map<string, ProvinceAccumulator>();

  reports.forEach((report) => {
    const province = (report.province || "Unknown").trim() || "Unknown";
    const reportDate = report.activity_date ? new Date(report.activity_date) : null;

    const monthKey =
      reportDate && !Number.isNaN(reportDate.getTime())
        ? `${reportDate.getFullYear()}-${String(reportDate.getMonth() + 1).padStart(2, "0")}`
        : "unknown-month";

    if (!provinceMap.has(province)) {
      provinceMap.set(province, {
        province,
        totalReports: 0,
        totalSouls: 0,
        totalExpenditure: 0,
        months: new Set<string>(),
      });
    }

    const item = provinceMap.get(province)!;
    item.totalReports += 1;
    item.totalSouls += parseNumericValue(report.souls_won);
    item.totalExpenditure += parseNumericValue(report.amount_spent);
    item.months.add(monthKey);
  });

  return Array.from(provinceMap.values())
    .map((item) => ({
      province: item.province,
      totalReports: item.totalReports,
      activeMonths: item.months.size,
      totalSouls: item.totalSouls,
      totalExpenditure: item.totalExpenditure,
    }))
    .sort((a, b) => {
      if (b.activeMonths !== a.activeMonths) {
        return b.activeMonths - a.activeMonths;
      }

      if (b.totalReports !== a.totalReports) {
        return b.totalReports - a.totalReports;
      }

      if (b.totalSouls !== a.totalSouls) {
        return b.totalSouls - a.totalSouls;
      }

      return b.totalExpenditure - a.totalExpenditure;
    })
    .slice(0, 10);
};

export const getDashboardMetrics = async (): Promise<DashboardMetricsResponse> => {
  const [membersCount, monthlyReports] = await Promise.all([
    fetchTotalMembersAPICall(),
    fetchNationalMonthlyReportAPICall(),
  ]);

  const reports: MonthlyReportDTO[] = Array.isArray(monthlyReports) ? monthlyReports : [];

  const totalExpenditure = reports.reduce((acc, report) => {
    return acc + parseNumericValue(report.amount_spent);
  }, 0);

  const totalSoulsSaved = reports.reduce((acc, report) => {
    return acc + parseNumericValue(report.souls_won);
  }, 0);

  const topReportingProvinces = buildTopReportingProvinces(reports);

  return {
    totalMembers: Number.isFinite(membersCount) ? membersCount : 0,
    totalMonthlyReports: reports.length,
    totalExpenditure,
    totalSoulsSaved,
    topReportingProvinces,
  };
};