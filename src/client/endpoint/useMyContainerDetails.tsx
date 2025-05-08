import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQueries} from "@tanstack/react-query";
import {QR, useGet} from "../query/useGet.tsx";
import {ArContainer, ArMyContainers} from "../ArModel.ts";
import {getContainer} from "./useContainer.tsx";

/**
 * Get container for every name in my containers
 */
export function useMyContainerDetails(): QR<ArContainer>[] {
  const client = useOpenApiClient();

  const {data: myContainers}: QR<ArMyContainers> = useGet('/my/containers')

  return useQueries({
    queries: myContainers
      ? Object
        .values(myContainers)
        .flatMap(names => names)
        .map(name => getContainer(client, name))
      : []
  })
}

