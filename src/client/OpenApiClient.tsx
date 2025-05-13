import createClient, {FetchOptions, Middleware} from "openapi-fetch";
import {paths} from "../openapi.ts";
import {HttpMethod, PathsWithMethod} from "openapi-typescript-helpers";
import {
  UseMutationOptions as RQUseMutationOptions
} from "@tanstack/react-query";

export function createOpenApiClient(
  bearerToken: string,
  baseUrl: string
) {

  const authMiddleware: Middleware = {
    async onRequest(params) {
      params.request.headers.set('Authorization', `Bearer ${bearerToken}`)
    }
  }

  const validateStatusMiddleware: Middleware = {
    async onResponse({response}) {
      if (!response.ok) {
        throw new Error(`Received status ${response.status}`)
      }
    }
  }

  let client = createClient<paths>({baseUrl});
  client.use(
    authMiddleware,
    validateStatusMiddleware
  )
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