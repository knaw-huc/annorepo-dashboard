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
import { Any } from "../../model/Any.ts";
import { isEqual, isString } from "lodash";

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

export const allQueryHashes = new Set();
Object.assign(window, { allQueryHashes });

export function createQueryKey<P extends GetPath>(
  path: P,
  params?: GetParams<P>,
): Any[] {
  const keys = [path, params?.params].filter((k) => !isNil(k));
  allQueryHashes.add(JSON.stringify(keys));
  return keys;
}

export function hashIncludes(query: Query, ...keys: string[]) {
  const result = keys.some((k) => query.queryHash.includes(k));
  console.log("hashIncludes", result, keys, query.queryHash);
  return result;
}
export function keyEquals(query: Query, ...keys: string[]) {
  const result = keys.some((k) => {
    if (isString(query.queryKey)) {
      return k === query.queryKey;
    } else if (Array.isArray(query.queryKey)) {
      return query.queryKey.some((qk) => isEqual(k, qk));
    } else {
      throw new Error("Unknown queryKey type: " + typeof query.queryKey);
    }
  });
  console.log("keyEquals", result, keys, query.queryHash);
  return result;
}

export type PostPath = PathsWithMethod<paths, "post">;
