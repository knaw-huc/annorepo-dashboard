import {
  Query,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useOpenApiClient } from "../OpenApiClientProvider.tsx";
import isNil from "lodash/isNil";
import { Params, Paths } from "../OpenApiClient.tsx";
import { paths } from "../../openapi.ts";
import { PathsWithMethod } from "openapi-typescript-helpers";
import { GetPath } from "./GetPath.tsx";
import { Optional } from "../../util/Optional.ts";
import { isString } from "lodash";
import { Any } from "../../model/Any.ts";

export type GetParams<P extends Paths<"get">> = Params<"get", P> & {
  query?: Optional<UseQueryOptions, "queryKey">;
};

export function useGet<P extends GetPath, RESULT>(
  path: P,
  params?: GetParams<P>,
) {
  const client = useOpenApiClient();

  const queryFn: () => Promise<RESULT> = async () => {
    const { data } = await client.GET(path, params || ({} as GetParams<P>));
    return data as RESULT;
  };
  const queryKey = createQueryKey(path, params);
  return useQuery({
    ...params?.query,
    queryFn,
    queryKey,
  }) as UseQueryResult<RESULT>;
}

export const allQueryKeys = new Set();
Object.assign(window, { allQueryKeys });

export function createQueryKey<P extends GetPath>(
  path: P,
  params?: GetParams<P>,
): Any[] {
  const keys = [path, params?.params].filter((k) => !isNil(k));
  keys.forEach((k) => allQueryKeys.add(isString(k) ? k : JSON.stringify(k)));
  return keys;
}

export function hashIncludes(query: Query, key: string) {
  return query.queryHash.includes(key);
}

export function hashEquals(query: Query, keys: string[]) {
  return keys.some((k) => query.queryHash.includes(k));
}

export type PostPath = PathsWithMethod<paths, "post">;
