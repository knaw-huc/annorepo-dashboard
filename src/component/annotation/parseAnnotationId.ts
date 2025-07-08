import {pick} from "lodash";

const annotationUrlRegex = /^https?:\/\/(?<domain>[^\/]+)\/w3c\/(?<containerName>[^\/]+)\/(?<annotationName>.*)$/

export type AnnotationIdGroups = {
  annotationName: string,
  containerName: string
};

export function parseAnnotationId(annotationId: string): AnnotationIdGroups {
  const match = annotationId.match(annotationUrlRegex);
  if (!match?.groups) {
    throw new Error(`Annotation ID '${annotationId}' does not match regex: ${annotationUrlRegex}`)
  }
  return pick(match.groups, ['containerName', 'annotationName']) as AnnotationIdGroups
}