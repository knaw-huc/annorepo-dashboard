import {orThrow} from "./orThrow.ts";

export function toName(id: string): string {
  let url;
  try {
    url = new URL(id);
  } catch (cause) {
    console.debug(`Could not transform id ${id} to url`, {cause})
    return id;
  }
  return url
      .toString()
      .split('/')
      .filter(part => !!part)
      .pop()
    ?? orThrow(`No name found in ${id}`);
}