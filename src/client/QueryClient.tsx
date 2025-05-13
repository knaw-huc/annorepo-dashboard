import {QueryClient} from "@tanstack/react-query";

export function createQueryClient() {
  const retry = 1;

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