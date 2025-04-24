import {useOpenApiClient} from "./OpenApiClientProvider.tsx";
import {useQueries} from "@tanstack/react-query";
import {QR, useGet} from "./useGet.tsx";
import {ArContainer, ArMyContainers} from "./ArModel.ts";
import {AnnoRepoOpenApiClient} from "./createOpenApiClient.tsx";

export function useMyContainerDetails() {
  const client = useOpenApiClient();

  const {data: myContainers} = useGet<
    '/my/containers',
    ArMyContainers
  >('/my/containers')

  return useQueries({
    queries: myContainers
      ? myContainers.ROOT.map(name => {
        return {
          queryKey: ['/my/containers', name],
          queryFn: getContainer(client, name),
        };
      })
      : []
  }) as QR<ArContainer>[]
}

export function getContainer(
  client: AnnoRepoOpenApiClient,
  name: string
) {
  return async () => await client.GET(
    '/w3c/{containerName}',
    {params: {path: {containerName: name}}}
  ).then(({data}) => data);
}