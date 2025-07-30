import { ArQuery } from "../../../model/ArModel.ts";
import { Subquery } from "../../../model/query/QueryModel.ts";
import { objectEntries } from "../../../util/objectEntries.ts";
import { toSubquery } from "./toSubquery.ts";

/**
 * From AR to internal query
 * See also {@link toArQuery}
 */
export function toQuery(query: ArQuery, paramNames?: string[]): Subquery[] {
  return objectEntries(query).map((entry) => {
    return toSubquery(entry, paramNames);
  });
}
