import { get, PropertyName } from "lodash";
import { orThrow } from "../../../util/orThrow.ts";

export function getOrThrow(source: object, path: PropertyName[]) {
  if (!path.length) {
    return source;
  }
  return (
    get(source, path) ??
    orThrow(`Path ${path} not found in ${JSON.stringify(source)}`)
  );
}
