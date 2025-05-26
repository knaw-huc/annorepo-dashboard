import {ErrorRecord} from "./ErrorRecord.ts";
import {mapValues} from "lodash";

export function toErrorRecord<T extends object>(template: T): ErrorRecord<T> {
  return mapValues(template, _ => '');
}