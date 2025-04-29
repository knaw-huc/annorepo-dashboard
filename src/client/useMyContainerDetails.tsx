import {useOpenApiClient} from "./OpenApiClientProvider.tsx";
import {useQueries} from "@tanstack/react-query";
import {QR, useGet} from "./useGet.tsx";
import {ArContainer, ArMyContainers} from "./ArModel.ts";
import {getContainer} from "./useContainer.tsx";

export function useMyContainerDetails() {
  const client = useOpenApiClient();

  const {data: myContainers}: QR<ArMyContainers> = useGet('/my/containers')

  return useQueries({
    queries: myContainers
      ? myContainers.ROOT.map(name => getContainer(client, name))
      : []
  }) as QR<ArContainer>[]
}

