import {orThrow} from "./orThrow.ts";

export function toName(id: string): string {
  let url;
  try {
    url = new URL(id);
  } catch (cause) {
    throw new Error(`Could not transform id ${id} to url`, {cause})
  }
  return url
      .toString()
      .split('/')
      .filter(part => !!part)
      .pop()
    ?? orThrow(`No name found in ${id}`);
}