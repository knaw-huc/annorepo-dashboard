import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {ArContainerFields} from "../ArModel.ts";
import {createQueryKey, QR} from "../query/useGet.tsx";

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
      .then(({data}) => data),
  }  );
}