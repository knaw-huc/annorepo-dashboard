export function createAnnotationId(
  containerName: string,
  annotationName: string,
  arHost: string
): string {
  return `${arHost}/w3c/${containerName}/${annotationName}`;
}