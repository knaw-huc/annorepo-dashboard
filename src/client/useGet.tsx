import {useQuery, UseQueryOptions, UseQueryResult} from "@tanstack/react-query";
import {Params, Paths} from "./Query.ts";
import {useOpenApiClient} from "./OpenApiClientProvider.tsx";

type GetParams<P extends Paths<"get">> = Params<"get", P> & {
  query?: Omit<UseQueryOptions, 'queryKey'>
};

export type QR<R> = UseQueryResult<R>

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

  return useQuery({
    // What else to add to keys?
    queryKey: [path],
    queryFn,
    ...params?.query,
  }) as UseQueryResult<RESULT>;
}

