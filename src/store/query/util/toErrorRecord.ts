import {mapValues} from "lodash";
import {ErrorRecord} from "../../../component/common/search/QueryModel.ts";

export function toErrorRecord<T extends object>(template: T): ErrorRecord<T> {
  return mapValues(template, () => '');
}