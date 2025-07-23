import { ParamValue } from "../../../model/query/ParamValue.ts";
import { isString } from "lodash";

export function findParam(
  queryValue: string,
  paramNames?: string[],
): ParamValue {
  if (!paramNames) {
    return false;
  }
  if (!isString(queryValue)) {
    return false;
  }
  const found = paramNames.find((param) => param && queryValue.includes(param));
  return found ?? false;
}
