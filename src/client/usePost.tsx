import {useMutation} from "@tanstack/react-query";
import {Params, Paths, UseMutationOptions} from "./Query.ts";
import {useOpenApiClient} from "./OpenApiClientProvider.tsx";

export function usePost<P extends Paths<'post'>>(
  path: P,
  options?: UseMutationOptions
) {
  const client = useOpenApiClient();

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