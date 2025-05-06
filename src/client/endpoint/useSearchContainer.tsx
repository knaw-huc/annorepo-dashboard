import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {ArAnnotationPage, ArQuery} from "../ArModel.ts";
import {toName} from "../../util/toName.ts";
import {QR} from "../query/useGet.tsx";

export function useSearchContainer(
  containerName: string,
  query: ArQuery,
  page: number = 0,
): QR<ArAnnotationPage> {
  const client = useOpenApiClient()

  const queryKey = [containerName, query];
  const {data: location} = useQuery({
    queryKey,
    queryFn: () => searchContainer(client, containerName, query),
  });

  return useQuery({
    queryKey: [...queryKey, location, page],
    queryFn: async () => getSearchContainerResult(
      client,
      containerName,
      location!,
      page
    ),
    enabled: !!location,
    placeholderData: keepPreviousData,
  });
}

export async function searchContainer(
  client: AnnoRepoOpenApiClient,
  containerName: string,
  query: ArQuery,
) {
  return client.POST(
    "/services/{containerName}/search",
    {
      // openapi type says text but api wants json:
      body: query as unknown as string,
      params: {path: {containerName}}
    }
  ).then(({response}) => toName(
    response.headers.get('Location')!
  ));
}

export async function getSearchContainerResult(
  client: AnnoRepoOpenApiClient,
  containerName: string,
  searchId: string,
  page: number
) {
  return client.GET(
    '/services/{containerName}/search/{searchId}',
    {
      params: {
        path: {
          containerName,
          searchId
        },
        query: {page}
      }
    }
  ).then(({data}) => data);
}