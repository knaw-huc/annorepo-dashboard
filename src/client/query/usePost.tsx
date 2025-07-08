import {useMutation} from "@tanstack/react-query";
import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {Params, Paths, UseMutationOptions} from "../OpenApiClient.tsx";
import {MR} from "./MR.tsx";

export function usePost<P extends Paths<'post'>, T>(
  path: P,
  options?: UseMutationOptions
): MR<T> {
  const client = useOpenApiClient();

  const mutationFn = async (params: Params<'post', P>) => {
    const {data, error} = await client.POST(path, params)
    if (error) {
      throw error
    }
    return data as T
  };

  return useMutation({
    mutationFn,
    ...options
  }) as MR<T>
}