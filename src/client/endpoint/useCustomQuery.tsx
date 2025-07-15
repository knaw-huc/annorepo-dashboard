import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {createQueryKey} from "../query/useGet.tsx";
import {useQuery} from "@tanstack/react-query";
import {ArAnnotationPage, ArCustomQueryResult} from "../ArModel.ts";
import {encodeString} from "../../util/base64.ts";
import {objectEntries} from "../../util/objectEntries.ts";
import {QR} from "../query/QR.tsx";
import {GetPath} from "../query/GetPath.tsx";

import {
  CustomQueryParams
} from "../../component/custom-query/model/CustomQueryParams.ts";

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
export type CustomQueryCallArgs = {
  queryName: string,
  containerName: string,
  parameters: CustomQueryParams,
  pageNo: number,
}

export function useCustomQueryCall(props: CustomQueryCallArgs): QR<ArAnnotationPage> {
  const client = useOpenApiClient();
  const {
    queryName,
    containerName,
    parameters,
    pageNo
  } = props;
  return useQuery(
    getContainerCustomQueryCall(
      client,
      queryName,
      containerName,
      parameters,
      pageNo
    )
  )
}

export function getContainerCustomQueryCall(
  client: AnnoRepoOpenApiClient,
  queryCall: string,
  containerName: string,
  queryParameters: CustomQueryParams,
  pageNo: number = 0,
) {

  const base64EncodedParams = objectEntries(queryParameters)
    .map(([k, v]) => `${k}=${encodeString(v)}`)
    .join(',');
  const queryCallWithParameters = base64EncodedParams
    ? queryCall + ':' + base64EncodedParams
    : queryCall
  const params = {
    params: {
      path: {
        containerName,
        queryCall: queryCallWithParameters
      },
      query: {page: pageNo}
    }
  };
  const path: GetPath = `/services/{containerName}/custom-query/{queryCall}`;
  return {
    enabled: !!containerName,
    queryKey: createQueryKey(path, params),
    queryFn: async () => {
      const result = await client
        .GET(path, params);
      return result.data;

    },
  };
}
