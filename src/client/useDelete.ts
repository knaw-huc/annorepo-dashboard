import {client, Params, Paths, UseMutationOptions} from "./Query.ts";
import {useMutation} from "@tanstack/react-query";

export function useDelete<P extends Paths<"delete">>(path: P, opts?: UseMutationOptions) {
  const mutationFn = (params: Params<"delete", P>) =>
    client.DELETE(path, params).then(({data}) => data);

  return useMutation({
    mutationFn,
    ...opts,
  });
}