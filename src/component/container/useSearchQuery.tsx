import {useOpenApiClient} from "../../client/OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {getSearchById} from "../../client/useSearchContainer.tsx";
import {getUuid} from "./ContainerCard.tsx";

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