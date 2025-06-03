import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {createQueryKey, GetPath, QR} from "../query/useGet.tsx";
import {useQuery} from "@tanstack/react-query";
import {ArCustomQueryResult} from "../ArModel.ts";
import {encodeString} from "../../util/base64.ts";
import {objectEntries} from "../../util/objectEntries.ts";

export function useCustomQuery(
  name: string,
  queryParameters: Record<string, string>
): QR<ArCustomQueryResult> {
  const client = useOpenApiClient();
  return useQuery(
    getCustomQuery(client, name, queryParameters)
  )
}

export function getCustomQuery(
  client: AnnoRepoOpenApiClient,
  name: string,
  queryParameters: Record<string, string>
) {
  const base64Encoded = objectEntries(queryParameters)
    .map(([k, v]) => `${k}=${encodeString(v)}`)
    .join(',');
  const nameWithParameters = base64Encoded ? name + ':' + base64Encoded : name
  const params = {params: {path: {customQueryName: nameWithParameters}}};
  const path: GetPath = '/global/custom-query/{customQueryName}';
  return {
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data),
  };
}
