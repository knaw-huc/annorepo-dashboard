import {
  QueryClient,
  UseMutationOptions as RQUseMutationOptions
} from '@tanstack/react-query'
import {HttpMethod, PathsWithMethod} from 'openapi-typescript-helpers'
import {FetchOptions} from 'openapi-fetch'
import {paths} from "../openapi.ts";
import {useClient} from "./useClient.tsx";

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

/**
 * Use within query hooks
 */
export const client = useClient()

/**
 * Use in exported components
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})