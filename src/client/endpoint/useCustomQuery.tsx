import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {createQueryKey, GetPath, QR} from "../query/useGet.tsx";
import {useQuery} from "@tanstack/react-query";
import {ArCustomQueryResult} from "../ArModel.ts";

export function useCustomQuery(
  name: string
): QR<ArCustomQueryResult> {
  const client = useOpenApiClient();
  return useQuery(
    getCustomQuery(client, name)
  )
}

export function getCustomQuery(
  client: AnnoRepoOpenApiClient,
  name: string,
) {
  const params = {params: {path: {customQueryName: name}}};
  const path: GetPath = '/global/custom-query/{customQueryName}';
  return {
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data),
  };
}
