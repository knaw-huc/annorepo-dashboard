import { SearchQueryJson } from "../../../model/ArModel.ts";
import { Subquery } from "../../../model/query/QueryModel.ts";
import { toSubquery } from "./toSubquery.ts";
import { objectEntries } from "../../../util/objectEntries.ts";

export function toSubqueries(
  // TODO: replace with ArCompareRecord or 'ArQueryRecord'
  query: SearchQueryJson,
  paramNames?: string[],
): Subquery[] {
  return objectEntries(query).map((entry) => {
    return toSubquery(entry, paramNames);
  });
}
