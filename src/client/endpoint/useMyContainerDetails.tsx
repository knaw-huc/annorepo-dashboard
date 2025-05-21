import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQueries} from "@tanstack/react-query";
import {QR, useGet} from "../query/useGet.tsx";
import {getContainer} from "./useContainer.tsx";
import {ArContainer, ArMyContainers} from "../ArModel.ts";
import {getContainerNames} from "./getContainerNames.tsx";

/**
 * Get container for every name in my containers
 */
export function useMyContainerDetails() {
  const client = useOpenApiClient();

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>

  const details = useQueries({
    queries: myContainers.data
      ? getContainerNames(myContainers.data)
        .map(name => getContainer(client, name))
      : []
  }) as QR<ArContainer>[];
  return {myContainers, details}
}

