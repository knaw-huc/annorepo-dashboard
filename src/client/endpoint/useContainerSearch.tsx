import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {ArQuery} from "../ArModel.ts";
import {toName} from "../../util/toName.ts";
import {createQueryKey, GetPath, QR} from "../query/useGet.tsx";

export function useContainerSearch(
  containerName: string,
  query: ArQuery | undefined,
  pageNo: number = 0,
): Record<string, QR> {
  const client = useOpenApiClient()
  const queryKey = [containerName, query];
  const search  = useQuery({
    queryKey,
    queryFn: () => searchContainer(client, containerName, query!),
    enabled: !!query
  }) as QR<string>;

  const location: string | undefined = search.data;
  const path: GetPath = '/services/{containerName}/search/{searchId}';
  const params = {
    params: {
      path: {
        containerName,
        searchId: location!
      },
      query: {page: pageNo}
    }
  };
  const page = useQuery({
    queryKey: createQueryKey(path, params),
    queryFn: async () => client.GET(
      path,
      params
    ).then(({data}) => data),
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

