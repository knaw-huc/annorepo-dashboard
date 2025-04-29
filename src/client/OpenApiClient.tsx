import {orThrow} from "../util/orThrow.ts";
import createClient, {FetchOptions, Middleware} from "openapi-fetch";
import {paths} from "../openapi.ts";
import {HttpMethod, PathsWithMethod} from "openapi-typescript-helpers";
import {
  UseMutationOptions as RQUseMutationOptions
} from "@tanstack/react-query";

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

/**
 * Integrating tanstack query with openapi
 * Inspired by: https://github.com/ruanmartinelli/tanstack-query-openapi-demo/
 */
export type Paths<M extends HttpMethod> = PathsWithMethod<paths, M>
export type Params<M extends HttpMethod, P extends Paths<M>> = M extends keyof paths[P]
  ? FetchOptions<paths[P][M]>
  : never
// Add more options as needed:
export type UseMutationOptions = Pick<RQUseMutationOptions, 'retry'>