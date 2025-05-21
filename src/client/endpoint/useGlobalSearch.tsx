import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {ArQuery} from "../ArModel.ts";
import {toName} from "../../util/toName.ts";
import {QR} from "../query/useGet.tsx";

export function useGlobalSearch(
  query?: ArQuery,
  pageNo: number = 0,
): Record<string, QR> {
  const client = useOpenApiClient()
  const queryKey = [query];
  const search = useQuery({
    queryKey,
    queryFn: () => searchGlobal(client, query!),
    enabled: !!query
  }) as QR<string>;

  const location: string | undefined = search.data;
  const page = useQuery({
    queryKey: [...queryKey, location, pageNo],
    queryFn: async () => getSearchResult(
      client,
      location!,
      pageNo
    ),
    enabled: !!location,
    placeholderData: keepPreviousData,
  });

  return {search, page};
}

export async function searchGlobal(
  client: AnnoRepoOpenApiClient,
  query: ArQuery,
): Promise<string> {
  return client.POST(
    "/global/search",
    {
      // openapi type says text but api wants json:
      body: query as unknown as string,
    }
  ).then(({response}) => {
    return toName(
      response.headers.get('Location')!
    );
  });
}

export async function getSearchResult(
  client: AnnoRepoOpenApiClient,
  searchId: string,
  page: number
) {
  return client.GET(
    '/global/search/{searchId}',
    {
      params: {
        path: {
          searchId
        },
        query: {page}
      }
    }
  ).then(({data}) => data);
}