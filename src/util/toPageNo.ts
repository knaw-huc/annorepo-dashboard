import {orThrow} from "./orThrow.ts";
import {toNumber} from "lodash";

export function toPageNo(id: string): number {
  let url;
  try {
    url = new URL(id);
  } catch (cause) {
    throw new Error(`Could not transform id ${id} to url`, {cause})
  }
  let pageNo = toNumber(url.searchParams.get('page'))
    ?? orThrow(`No page search param in ${id}`);
  return pageNo;
}