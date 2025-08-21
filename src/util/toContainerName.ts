import { orThrow } from "./orThrow.ts";
import { toPath } from "./toPath.ts";

export function toContainerName(idOrName: string): string {
  const asPath = toPath(idOrName);
  return (
    asPath
      .toString()
      .split("/")
      .filter((part) => !!part)
      .pop() ?? orThrow(`No name found in ${idOrName}`)
  );
}
