import {useOpenApiClient} from "./OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {getUuid} from "../component/container/ContainerCard.tsx";
import {AnnoRepoOpenApiClient} from "./createOpenApiClient.tsx";
import {ArQuery} from "./ArModel.ts";

export function useQueryContainer(
  containerName: string,
  query: ArQuery
) {
  const client = useOpenApiClient()

  const {data: location} = useQuery({
    queryKey: [containerName, query],
    queryFn: () => postContainerSearchQuery(client, containerName, query),
  });

  return useQuery({
    queryKey: [containerName, query, location],
    queryFn: async () => getSearchResultById(client, containerName, location!),
    enabled: !!location,
  });
}

export async function postContainerSearchQuery (
  client: AnnoRepoOpenApiClient,
  containerName: string,
  query: ArQuery
){
  return client.POST(
    "/services/{containerName}/search",
    {
      body: query as unknown as string,
      params: {path: {containerName}}
    }
  ).then(({response}) => getUuid(
    new URL(
      response.headers.get('Location')!
    )
  ));
}

export async function getSearchResultById(
  client: AnnoRepoOpenApiClient,
  containerName: string,
  searchId: string
) {
  if (!searchId) {
    throw new Error('No search ID provided')
  }
  return client.GET(
    '/services/{containerName}/search/{searchId}',
    {
      params: {
        path: {
          containerName,
          searchId: searchId
        }
      }
    }
  );
}