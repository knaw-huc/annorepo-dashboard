import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {ArContainerFields} from "../ArModel.ts";
import {createQueryKey, QR} from "../query/useGet.tsx";

export function useContainerFields(
  containerName: string
): QR<ArContainerFields> {
  const client = useOpenApiClient()
  return useQuery(
    getContainerFields(client, containerName)
  );
}

export function getContainerFields(
  client: AnnoRepoOpenApiClient,
  name: string
) {
  const path = '/services/{containerName}/fields';
  const params = {params: {path: {containerName: name}}};
  return {
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data),
  }
}