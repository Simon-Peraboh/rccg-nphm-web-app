import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      staleTime: 1000 * 30, // 30 seconds, not 5 minutes
      refetchInterval: 1000 * 60, // every 1 minute while page is open
    },
    mutations: {
      retry: 0,
    },
  },
});
