import {orThrow} from "../util/orThrow.ts";
import createClient, {Middleware} from "openapi-fetch";
import type {paths} from "../openapi.ts";

export function createOpenApiClient(bearerToken: string) {

  const authMiddleware: Middleware = {
    async onRequest(params) {
      params.request.headers.set('Authorization', `Bearer ${bearerToken}`)
    }
  }

  const arHost = 'VITE_AR_HOST';
  const baseUrl = import.meta.env[arHost]
    ?? orThrow(`${arHost} not set`);
  console.log(`Create client with baseurl ${baseUrl}`)
  let client = createClient<paths>({baseUrl});
  client.use(authMiddleware)
  return client
}

export type AnnoRepoOpenApiClient = ReturnType<typeof createOpenApiClient>

