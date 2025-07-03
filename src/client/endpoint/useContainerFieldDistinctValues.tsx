import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {createQueryKey, QR} from "../query/useGet.tsx";

export function useContainerFieldDistinctValues(
  containerName: string = '',
  field: string = ''
): QR<any[]> {
  const client = useOpenApiClient()
  const path = '/services/{containerName}/distinct-values/{field}';
  const params = {params: {path: {containerName, field}}};
  let queryKey = createQueryKey(path, params);
  let enabled = !!containerName && !!field;
  return useQuery({
    enabled: enabled,
    queryKey: queryKey,
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data),
  });
}