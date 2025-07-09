import {QR} from "../query/QR.tsx";
import {useQueries} from "@tanstack/react-query";
import {
  ArAnnotationWithETag,
  getContainerAnnotation
} from "./useContainerAnnotation.tsx";
import {useOpenApiClient} from "../OpenApiClientProvider.tsx";
import {
  parseAnnotationId
} from "../../component/annotation/parseAnnotationId.ts";

type ContainerAnnotationParam = {
  containerName: string,
  annotationName: string
}

export function useContainerAnnotations(
  ids: string[]
): QR<ArAnnotationWithETag>[] {
  const client = useOpenApiClient();

  const params: ContainerAnnotationParam[] = ids
    .map(id => parseAnnotationId(id))
    .filter(parsed => !!parsed)

  return useQueries({
    queries: params.map(p => getContainerAnnotation(client, p.containerName, p.annotationName))
  });
}
