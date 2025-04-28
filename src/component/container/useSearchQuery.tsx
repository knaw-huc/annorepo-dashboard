import {useOpenApiClient} from "../../client/OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {getUuid} from "./ContainerCard.tsx";
import {AnnoRepoOpenApiClient} from "../../client/createOpenApiClient.tsx";

export function useSearchQuery(
  query: object,
  containerName: string
) {
  const client = useOpenApiClient()

  const queryContainerSearchFn = async () => {
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
  };

  const {data: location} = useQuery({
    queryKey: [containerName, query],
    queryFn: queryContainerSearchFn,
  });

  return useQuery({
    queryKey: [containerName, query, location],
    queryFn: async () => getSearchById(client, containerName, location!),
    enabled: !!location,
  });
}

export async function getSearchById(
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