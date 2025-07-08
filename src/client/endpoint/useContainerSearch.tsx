import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {ArQuery, SearchQuery} from "../ArModel.ts";
import {toName} from "../../util/toName.ts";
import {createQueryKey} from "../query/useGet.tsx";
import {QR} from "../query/QR.tsx";
import {GetPath} from "../query/GetPath.tsx";

export type ContainerSearchArgs = {
  containerName: string,
  query?: SearchQuery,
  pageNo: number
}

export function useContainerSearch(
  args: ContainerSearchArgs
): Record<string, QR> {
  const {containerName, query, pageNo} = args;
  const client = useOpenApiClient()

  const queryKey = [containerName, query];
  const enabled = !!query && !!containerName;
  const search = useQuery({
    queryKey,
    queryFn: () => searchContainer(client, containerName, query!),
    enabled
  }) as QR<string>;

  const getSearchLocation: string | undefined = search.data;
  const getSearchPath: GetPath = '/services/{containerName}/search/{searchId}';
  const getSearchParams = {
    params: {
      path: {
        containerName,
        searchId: getSearchLocation!
      },
      query: {page: pageNo}
    }
  };
  const page = useQuery({
    queryKey: createQueryKey(getSearchPath, getSearchParams),
    queryFn: async () => client.GET(
      getSearchPath,
      getSearchParams
    ).then(({data}) => data),
    enabled: !!getSearchLocation,
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

