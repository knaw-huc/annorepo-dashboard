import {orThrow} from "../util/orThrow.ts";
import {QueryClient} from "@tanstack/react-query";
import createClient from "openapi-fetch";
import type {paths} from "../openapi.ts";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })
}

export function createOpenApiClient() {
    const arHost = 'VITE_AR_HOST';
    const baseUrl = import.meta.env[arHost]
      ?? orThrow(`${arHost} not set`);
    console.log(`Create client with baseurl ${baseUrl}`)
    return createClient<paths>({baseUrl})
}

export type AnnoRepoOpenApiClient = ReturnType<typeof createOpenApiClient>