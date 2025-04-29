import {useMutation} from "@tanstack/react-query";
import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {Params, Paths, UseMutationOptions} from "../OpenApiClient.tsx";

export function usePost<P extends Paths<'post'>>(
  path: P,
  options?: UseMutationOptions
) {
  const client = useOpenApiClient();

  const mutationFn = async (params: Params<'post', P>) => {
    const {data, error, response} = await client.POST(path, params)
    if (error) {
      throw error
    }
    return {data, response}
  };

  return useMutation({
    mutationFn,
    ...options
  })
}