import {
  Query,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from "@tanstack/react-query";
import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import isNil from "lodash/isNil";
import {Params, Paths} from "../OpenApiClient.tsx";
import {paths} from "../../openapi.ts";
import {PathsWithMethod} from "openapi-typescript-helpers";
import {GetPath} from "./GetPath.tsx";
import {Optional} from "../../util/Optional.ts";

export type GetParams<P extends Paths<"get">> = Params<"get", P> & {
  query?: Optional<UseQueryOptions, 'queryKey'>
};

export function useGet<P extends GetPath, RESULT>(
  path: P,
  params?: GetParams<P>
) {
  const client = useOpenApiClient();

  const queryFn: () => Promise<RESULT> = async () => {
    const {data} = await client.GET(
      path,
      params || {} as GetParams<P>
    );
    return data as RESULT;
  };
  const queryKey = createQueryKey(path, params);
  return useQuery({
    ...params?.query,
    queryFn,
    queryKey,
  }) as UseQueryResult<RESULT>;
}

export const allQueryKeys = new Set()
Object.assign(window, {allQueryKeys})

export function createQueryKey<P extends GetPath>(
  path: P,
  params?: GetParams<P>
) {
  const keys = [path, params?.params]
    .filter(k => !isNil(k));
  keys.forEach(k => allQueryKeys.add(JSON.stringify(k)))
  return keys;
}

export function invalidateBy(query: Query, key: string) {
  return query.queryHash.includes(key);
}

export type PostPath = PathsWithMethod<paths, "post">