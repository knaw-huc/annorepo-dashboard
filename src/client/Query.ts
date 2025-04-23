import {UseMutationOptions as RQUseMutationOptions} from '@tanstack/react-query'
import {HttpMethod, PathsWithMethod} from 'openapi-typescript-helpers'
import {FetchOptions} from 'openapi-fetch'
import {paths} from "../openapi.ts";

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
