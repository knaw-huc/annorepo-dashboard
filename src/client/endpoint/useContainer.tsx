import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {createQueryKey} from "../query/useGet.tsx";
import {useQuery} from "@tanstack/react-query";
import {ArContainer} from "../ArModel.ts";
import {QR} from "../query/QR.tsx";
import {GetPath} from "../query/GetPath.tsx";

export function useContainer(
  name: string
): QR<ArContainer> {
  const client = useOpenApiClient();
  return useQuery(
    getContainer(client, name)
  )
}

export function getContainer(
  client: AnnoRepoOpenApiClient,
  name: string,
) {
  const path: GetPath = '/w3c/{containerName}';
  const params = {params: {path: {containerName: name}}};
  return {
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data),
  };
}
