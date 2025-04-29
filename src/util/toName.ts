import {orThrow} from "./orThrow.ts";

export function toName(idUrl: URL): string {
  return idUrl
      .toString()
      .split('/')
      .filter(part => !!part)
      .pop()
    ?? orThrow(`No name found in ${idUrl}`);
}