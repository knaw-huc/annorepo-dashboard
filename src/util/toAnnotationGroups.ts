import { pick } from "lodash";
import { toPath } from "./toPath";

const annotationPathRegex =
  /^.*\/w3c\/(?<containerName>[^/]+)\/(?<annotationName>.*)$/;

export type AnnotationIdGroups = {
  annotationName: string;
  containerName: string;
};

export function toAnnotationGroups(
  annotationIdOrName: string,
): AnnotationIdGroups | undefined {
  const path = toPath(annotationIdOrName);
  const match = path.match(annotationPathRegex);
  if (!match?.groups) {
    return undefined;
  }
  return pick(match.groups, [
    "containerName",
    "annotationName",
  ]) as AnnotationIdGroups;
}
