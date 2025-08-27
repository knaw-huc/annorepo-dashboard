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
import { isArray, isString } from "lodash";
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

export function queryKeyIncludes(query: Query, ...keys: string[]) {
  return keys.some((k) => {
    if (isString(query.queryKey)) {
      return query.queryKey === k;
    } else if (isArray(query.queryKey)) {
      return query.queryKey.includes(k);
    } else {
      const message = "Query key of unknown type:";
      console.error(message, query.queryKey);
      throw new Error(message + " " + typeof query.queryKey);
    }
  });
}

export type PostPath = PathsWithMethod<paths, "post">;
