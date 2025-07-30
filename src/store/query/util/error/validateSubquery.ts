import { Subquery } from "../../../../model/query/QueryModel.ts";
import { validateQuery } from "./validateQuery.ts";
import { pruneQuery } from "../pruneQuery.ts";
import { PropertyName } from "lodash";
import { getSubquery } from "../getSubquery.ts";

/**
 * Check subquery does not invalidate query
 */
export function validateSubquery(path: PropertyName[], query: Subquery[]) {
  const subquery = getSubquery(query, path);
  const subqueryInErrorlessQuery = pruneQuery(query, (sq) => {
    if (sq === subquery) {
      // Keep current subquery:
      return false;
    }
    return !!sq.queryError;
  });
  subquery.queryError = validateQuery(subqueryInErrorlessQuery);
}
