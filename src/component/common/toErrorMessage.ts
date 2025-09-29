import { Any } from "../../model/Any.ts";

export function toErrorMessage(error: Error | Any) {
  return error instanceof Error ? error.message : "Unknown";
}
