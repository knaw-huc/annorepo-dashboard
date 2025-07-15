import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {AnnoRepoOpenApiClient} from "../OpenApiClient.tsx";
import {createQueryKey} from "../query/useGet.tsx";
import {useQuery} from "@tanstack/react-query";
import {ArAnnotation} from "../ArModel.ts";
import {QR} from "../query/QR.tsx";
import {orThrow} from "../../util/orThrow.ts";

export type ArAnnotationWithETag = { annotation: ArAnnotation, ETag: string };

export function useContainerAnnotation(
  containerName: string,
  annotationName: string
): QR<ArAnnotationWithETag> {
  const client = useOpenApiClient();
  return useQuery(
    getContainerAnnotation(client, containerName, annotationName)
  )
}

export function getContainerAnnotation(
  client: AnnoRepoOpenApiClient,
  containerName: string,
  annotationName: string,
) {
  const path = '/w3c/{containerName}/{annotationName}';
  const params = {params: {path: {containerName, annotationName}}};
  return {
    queryKey: createQueryKey(path, params),
    queryFn: async () => await client
      .GET(path, params)
      .then(({data, response}) => ({
        annotation: data ?? orThrow('No annotation response'),
        // Needed when deleting:
        ETag: response.headers.get('ETag') ?? orThrow('No ETag response')
      }))
  };
}
