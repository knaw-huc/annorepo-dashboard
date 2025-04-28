import {useQuery} from "@tanstack/react-query";
import {useOpenApiClient} from "./OpenApiClientProvider.tsx";
import {getUuid} from "../component/container/ContainerCard.tsx";
import {AnnoRepoOpenApiClient} from "./createOpenApiClient.tsx";

export function useSearchContainer(
  containerName: string,
  query: object,
) {
  const client = useOpenApiClient();
  const queryContainerSearchFn = async () => {
    return client.POST(
      "/services/{containerName}/search",
      {
        body: query as unknown as string,
        params: {path: {containerName}}
      }
    ).then(({response}) => {
      const data = getUuid(new URL(response.headers.get('Location')!));
      console.log('post finished', {data})
      return data;
    });
  };

  const queryKey = [containerName, query];

  const qr = useQuery({
    queryKey: queryKey,
    queryFn: queryContainerSearchFn,
  });

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getSearchById(client, containerName, qr.data!),
    enabled: !!qr.data,
  })
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