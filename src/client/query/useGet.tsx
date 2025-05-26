import {
  Optional,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from "@tanstack/react-query";
import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import isNil from "lodash/isNil";
import {Params, Paths} from "../OpenApiClient.tsx";

type GetParams<P extends Paths<"get">> = Params<"get", P> & {
  query?: Optional<UseQueryOptions, 'queryKey'>
};

/**
 * Query Result
 */
export type QR<R = any> = UseQueryResult<R>

export function useGet<P extends Paths<"get">, RESULT>(
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

export function createQueryKey<P extends Paths<"get">>(
  path: P,
  params?: GetParams<P>
) {
  const keys = [path, params?.params]
    .filter(k => !isNil(k));
  keys.forEach(k => allQueryKeys.add(JSON.stringify(k)))
  return keys;
}
