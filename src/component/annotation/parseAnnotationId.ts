import {pick} from "lodash";

const annotationUrlRegex = /^https?:\/\/(?<domain>[^\/]+)\/w3c\/(?<containerName>[^\/]+)\/(?<annotationName>.*)$/

export type AnnotationIdGroups = {
  annotationName: string,
  containerName: string
};

export function parseAnnotationId(annotationId: string): AnnotationIdGroups | undefined {
  const match = annotationId.match(annotationUrlRegex);
  if (!match?.groups) {
    return undefined;
  }
  return pick(match.groups, ['containerName', 'annotationName']) as AnnotationIdGroups
}