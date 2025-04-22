import {useMutation} from "@tanstack/react-query";
import {client, Params, Paths, UseMutationOptions} from "./Query.ts";

export function usePut<P extends Paths<"put">>(path: P, opts?: UseMutationOptions) {
  const mutationFn = (params: Params<"put", P>) =>
    client.PUT(path, params).then(({data}) => data);

  return useMutation({
    mutationFn,
    ...opts,
  });
}