import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {createQueryKey, QR} from "../query/useGet.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {ArAnnotationPage} from "../ArModel.ts";

export function useContainerPage(
  containerName: string,
  page: number
): QR<ArAnnotationPage> {
  const client = useOpenApiClient();
  return useQuery(
    getContainerPage(client, containerName, page)
  );
}

export function getContainerPage(
  client: AnnoRepoOpenApiClient,
  containerName: string,
  page: number,
) {
  const path = '/w3c/{containerName}';
  const params = {
    params: {
      path: {containerName},
      query: {page},
    }
  };
  return {
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data),
    placeholderData: keepPreviousData,
  };
}
