import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQueries} from "@tanstack/react-query";
import {useGet} from "../query/useGet.tsx";
import {getContainer} from "./useContainer.tsx";
import {ArContainer, ArMyContainers} from "../../model/ArModel.ts";
import {getContainerNames} from "./getContainerNames.tsx";
import {QR} from "../query/QR.tsx";

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

