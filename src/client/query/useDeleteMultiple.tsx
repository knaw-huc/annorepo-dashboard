import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useOpenApiClient } from "../OpenApiClientProvider.tsx";
import { Params, Paths } from "../OpenApiClient.tsx";


export function useDeleteMultiple<P extends Paths<"delete">>(
  path: P,
  allOptions?: UseMutationOptions<any, any, Params<"delete", P>[]>
) {
  const client = useOpenApiClient();

  const mutationFn = (singleOptions: Params<"delete", P>[]) => {
    const allMutations = singleOptions.map(params =>
      client.DELETE(path, params).then(({ data }) => data)
    );
    return Promise.all(allMutations);
  };

  return useMutation({
    mutationFn,
    ...allOptions,
  });
}