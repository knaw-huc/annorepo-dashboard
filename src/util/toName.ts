import {orThrow} from "./orThrow.ts";

export function toName(id: string): string {
  try {
    const url = new URL(id);
    return url
        .toString()
        .split('/')
        .filter(part => !!part)
        .pop()
      ?? orThrow(`No name found in ${id}`);
  } catch (cause) {
    throw new Error(`Could not transform id ${id} to url`, {cause})
  }
}