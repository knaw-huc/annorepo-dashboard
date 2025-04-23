import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {Params, Paths} from "./Query.ts";
import {useOpenApiClient} from "./OpenApiClientProvider.tsx";

type GetParams<P extends Paths<"get">> = Params<"get", P> & {
  query: Omit<UseQueryOptions, 'queryKey'>
};

export function useGet<P extends Paths<"get">>(
  path: P,
  params?: GetParams<P>
) {
  const client = useOpenApiClient();

  const queryFn = async () => client.GET(
    path,
    params || {} as GetParams<P>
  ).then(({data}) => data);

  return useQuery({
    queryKey: [path, params],
    queryFn,
    ...params?.query,
  });
}