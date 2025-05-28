import {QueryClient} from "@tanstack/react-query";

export function createQueryClient() {
  const retry = false;

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry,
        staleTime: Infinity,
      },
      mutations: {
        retry
      }
    },
  })
}