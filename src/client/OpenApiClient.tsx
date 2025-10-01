import createClient, { FetchOptions, Middleware } from "openapi-fetch";
import { paths } from "../openapi.ts";
import { HttpMethod, PathsWithMethod } from "openapi-typescript-helpers";
import { decodeCustomQueryParameters } from "./util/decodeCustomQueryParameters.ts";

export function createOpenApiClient(baseUrl: string) {
  /**
   * Custom query parameters should not be encoded by openapi-fetch
   */
  const unencodeCustomQueryParameters: Middleware = {
    async onRequest(params) {
      params.request = new Request(
        decodeCustomQueryParameters(params.request.url),
        params.request,
      );
    },
  };

  const validateResponseStatus: Middleware = {
    async onResponse({ response }) {
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(
          `Error ${response.status}: ${errorBody.message ?? response.status}`,
        );
      }
    },
  };

  const client = createClient<paths>({ baseUrl });
  client.use(unencodeCustomQueryParameters, validateResponseStatus);
  return client;
}

export type AnnoRepoOpenApiClient = ReturnType<typeof createOpenApiClient>;

/**
 * Integrating tanstack query with openapi
 * Inspired by: https://github.com/ruanmartinelli/tanstack-query-openapi-demo/
 */
export type Paths<M extends HttpMethod> = PathsWithMethod<paths, M>;
export type Params<
  M extends HttpMethod,
  P extends Paths<M>,
> = M extends keyof paths[P] ? FetchOptions<paths[P][M]> : never;
