import { Any } from "../model/Any.ts";

export function isUrl(toTest?: Any): toTest is string {
  if (!toTest) {
    return false;
  }
  if (!["string", "object"].includes(typeof toTest)) {
    return false;
  }
  try {
    new URL(toTest);
    return true;
  } catch {
    return false;
  }
}
