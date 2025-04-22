import {useQuery} from "@tanstack/react-query";
import {client, Params, Paths, UseQueryOptions} from "./Query.ts";

type GetParams<P extends Paths<"get">> = Params<"get", P> & {
  query: UseQueryOptions
};

export function useGet<P extends Paths<"get">>(
  path: P,
  params?: GetParams<P>
) {
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