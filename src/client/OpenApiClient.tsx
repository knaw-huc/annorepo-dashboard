import createClient, {FetchOptions, Middleware} from "openapi-fetch";
import {paths} from "../openapi.ts";
import {HttpMethod, PathsWithMethod} from "openapi-typescript-helpers";
import {
  decodeCustomQueryParameters
} from "./util/decodeCustomQueryParameters.ts";

export function createOpenApiClient(
  bearerToken: string,
  baseUrl: string
) {

  const addBearerTokenHeader: Middleware = {
    async onRequest(params) {
      params.request.headers.set('Authorization', `Bearer ${bearerToken}`)
    }
  }

  /**
   * Custom query parameters should not be encoded by openapi-fetch
   */
  const unencodeCustomQueryParameters: Middleware = {
    async onRequest(params) {
      params.request = new Request(decodeCustomQueryParameters(params.request.url), params.request)
    }
  }

  const validateResponseStatus: Middleware = {
    async onResponse({response}) {
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`Error ${response.status}: ${errorBody.message ?? response.status}`)
      }
    }
  }

  let client = createClient<paths>({baseUrl});
  client.use(
    addBearerTokenHeader,
    unencodeCustomQueryParameters,
    validateResponseStatus
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
