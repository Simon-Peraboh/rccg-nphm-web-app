import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics } from "../services/dashboardService";

export const dashboardQueryKeys = {
  metrics: ["dashboard", "metrics"] as const,
};

export const useDashboardMetrics = () =>
  useQuery({
    queryKey: dashboardQueryKeys.metrics,
    queryFn: getDashboardMetrics,
    staleTime: 1000 * 30, // 30 seconds, not 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60, // every 1 minute while page is open
  });