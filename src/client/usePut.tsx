import {useMutation} from "@tanstack/react-query";
import {Params, Paths, UseMutationOptions} from "./Query.ts";
import {useOpenApiClient} from "./OpenApiClientProvider.tsx";

export function usePut<P extends Paths<"put">>(path: P, opts?: UseMutationOptions) {
  const client = useOpenApiClient().state.client;

  const mutationFn = (params: Params<"put", P>) =>
    client.PUT(path, params).then(({data}) => data);

  return useMutation({
    mutationFn,
    ...opts,
  });
}