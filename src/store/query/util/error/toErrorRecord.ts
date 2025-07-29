import { mapValues } from "lodash";

import { ErrorRecord } from "../../../../model/query/ErrorRecord.ts";

export function toErrorRecord<T extends object>(template: T): ErrorRecord<T> {
  return mapValues(template, () => "");
}
