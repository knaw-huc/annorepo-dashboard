import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {ArAnnotationPage, ArQuery} from "../ArModel.ts";
import {toName} from "../../util/toName.ts";
import {QR} from "../query/useGet.tsx";

export function useSearchContainer(
  containerName: string,
  query: ArQuery
): QR<ArAnnotationPage> {
  const client = useOpenApiClient()

  const {data: location} = useQuery({
    queryKey: [containerName, query],
    queryFn: () => searchContainer(client, containerName, query),
  });

  return useQuery({
    queryKey: [containerName, query, location],
    queryFn: async () => getSearchContainerResult(client, containerName, location!),
    enabled: !!location,
  });
}

export async function searchContainer(
  client: AnnoRepoOpenApiClient,
  containerName: string,
  query: ArQuery
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
  searchId: string
) {
  return client.GET(
    '/services/{containerName}/search/{searchId}',
    {
      params: {
        path: {
          containerName,
          searchId
        }
      }
    }
  ).then(({data}) => data);
}