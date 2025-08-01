import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {createQueryKey} from "../query/useGet.tsx";
import {QR} from "../query/QR.tsx";
import {QueryValue} from "../../model/query/value/QueryValue.ts";
import {orThrow} from "../../util/orThrow.ts";

export function useContainerFieldDistinctValues<T = QueryValue>(
  containerName: string = '',
  field: string = ''
): QR<T[]> {
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
      .then(({data}) => data ?? orThrow('No distinct values response')),
  });
}