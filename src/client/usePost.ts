import {useMutation} from "@tanstack/react-query";
import {client, Params, Paths, UseMutationOptions} from "./Query.ts";

export function usePost<P extends Paths<'post'>>(
  path: P,
  options?: UseMutationOptions
) {
  const mutationFn = async (params: Params<'post', P>) => {
    const {data, error} = await client.POST(path, params)
    if (error) {
      throw error
    }
    return data
  };

  return useMutation({
    mutationFn,
    ...options
  })
}