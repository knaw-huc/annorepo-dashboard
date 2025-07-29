import {
  isComparisonSubquery,
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { validateQuery } from "./validateQuery.ts";
import { pruneQuery } from "./pruneQuery.ts";
import { hasError } from "./hasError.ts";
import { PropertyName } from "lodash";
import { getSubquery } from "./getSubquery.ts";

/**
 * Check subquery does not invalidate query
 * Only validate when no error already present
 */
export function validateSubquery(path: PropertyName[], query: Subquery[]) {
  const subquery = getSubquery(query, path);
  const withoutErrors = pruneQuery(query, (sq) => {
    if (sq === subquery) {
      // Keep current subquery:
      return false;
    }
    if (isLogicalSubquery(sq)) {
      return !!sq.error;
    }
    return hasError(sq.errors);
  });

  if (isComparisonSubquery(subquery) && !subquery.errors.field) {
    subquery.errors.field = "";
    subquery.errors.field = validateQuery(withoutErrors);
  }

  if (isLogicalSubquery(subquery) && !subquery.error) {
    subquery.error = "";
    subquery.error = validateQuery(withoutErrors);
  }
}
