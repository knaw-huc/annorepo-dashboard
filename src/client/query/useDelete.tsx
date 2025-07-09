import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {Params, Paths} from "../OpenApiClient.tsx";

export function useDelete<P extends Paths<"delete">>(
  path: P,
  options?: UseMutationOptions<any, any, Params<"delete", P>>
) {
  const client = useOpenApiClient();

  const mutationFn = (params: Params<"delete", P>) =>
    client.DELETE(path, params).then(({data}) => data);

  return useMutation({
    mutationFn,
    ...options,
  });
}