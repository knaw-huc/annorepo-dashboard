import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {createQueryKey, GetPath, QR} from "../query/useGet.tsx";
import {useQuery} from "@tanstack/react-query";
import {ArCustomQueryResult} from "../ArModel.ts";
import {encodeString} from "../../util/base64.ts";
import {objectEntries} from "../../util/objectEntries.ts";

export function useCustomQuery(
  name: string,
): QR<ArCustomQueryResult> {
  const client = useOpenApiClient();
  return useQuery(
    getCustomQuery(client, name)
  )
}

export function getCustomQuery(
  client: AnnoRepoOpenApiClient,
  name: string,
) {
  const params = {params: {path: {customQueryName: name}}};
  const path: GetPath = '/global/custom-query/{customQueryName}';
  return {
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data),
  };
}

// --

export function useContainerCustomQueryCall(
  name: string,
  containerName: string,
  queryParameters: Record<string, string>
): QR<ArCustomQueryResult> {
  const client = useOpenApiClient();
  return useQuery(
    getContainerCustomQueryCall(client, name, containerName, queryParameters)
  )
}

export function getContainerCustomQueryCall(
  client: AnnoRepoOpenApiClient,
  queryCall: string,
  containerName: string,
  queryParameters: Record<string, string>
) {
  const base64EncodedParams = objectEntries(queryParameters)
    .map(([k, v]) => `${k}=${encodeString(v)}`)
    .join(',');
  const queryCallWithParameters = base64EncodedParams
    ? queryCall + ':' + base64EncodedParams
    : queryCall
  const params = {params: {path: {containerName, queryCall: queryCallWithParameters}}};
  const path: GetPath = `/services/{containerName}/custom-query/{queryCall}`;
  return {
    enabled: !!containerName,
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data),
  };
}
