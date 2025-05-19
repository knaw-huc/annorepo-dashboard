import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {ArQuery} from "../ArModel.ts";
import {toName} from "../../util/toName.ts";
import {QR} from "../query/useGet.tsx";

export function useSearchContainer(
  containerName: string,
  query?: ArQuery,
  pageNo: number = 0,
): Record<string, QR> {
  const client = useOpenApiClient()
  console.log('useSearchContainer', {containerName, query, pageNo})
  const queryKey = [containerName, query];
  const search = useQuery({
    queryKey,
    queryFn: () => searchContainer(client, containerName, query!),
    enabled: !!query
  }) as QR<string>;

  const location: string | undefined = search.data;
  const page = useQuery({
    queryKey: [...queryKey, location, pageNo],
    queryFn: async () => getSearchContainerResult(
      client,
      containerName,
      location!,
      pageNo
    ),
    enabled: !!location,
    placeholderData: keepPreviousData,
  });

  return {search, page};
}

export async function searchContainer(
  client: AnnoRepoOpenApiClient,
  containerName: string,
  query: ArQuery,
): Promise<string> {
  return client.POST(
    "/services/{containerName}/search",
    {
      // openapi type says text but api wants json:
      body: query as unknown as string,
      params: {path: {containerName}}
    }
  ).then(({response}) => {
    return toName(
      response.headers.get('Location')!
    );
  });
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