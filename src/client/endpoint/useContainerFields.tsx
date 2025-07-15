import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {ArContainerFields} from "../ArModel.ts";
import {createQueryKey} from "../query/useGet.tsx";
import {QR} from "../query/QR.tsx";
import {orThrow} from "../../util/orThrow.ts";

export function useContainerFields(
  containerName: string = ''
): QR<ArContainerFields> {
  
  const client = useOpenApiClient()
  const path = '/services/{containerName}/fields';
  const params = {params: {path: {containerName}}};
  return useQuery({
    enabled: !!containerName,
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data}) => data ?? orThrow('No container fields response')),
  }  );
}