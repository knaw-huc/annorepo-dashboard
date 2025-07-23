import {FormParamValue} from "../../../model/query/FormParamValue.ts";
import {isString} from "lodash";

export function findParam(
  queryValue: string,
  paramNames?: string[]
): FormParamValue {
  if (!paramNames) {
    return false;
  }
  if (!isString(queryValue)) {
    return false;
  }
  const found = paramNames.find(param => param && queryValue.includes(param));
  return found ?? false
}