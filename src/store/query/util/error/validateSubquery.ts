import {
  isComparisonSubquery,
  Subquery,
} from "../../../../model/query/QueryModel.ts";
import { validateQuery } from "./validateQuery.ts";
import { pruneQuery } from "../pruneQuery.ts";
import { PropertyName } from "lodash";
import { getSubquery } from "../path/getSubquery.ts";
import { SubqueryError } from "./SubqueryError.ts";
import { ValueError } from "./ValueError.ts";
import { clearErrors } from "./clearErrors.ts";

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
    // Keep valid siblings:
    return !!sq.queryError;
  });
  const validated = validateQuery(subqueryInErrorlessQuery);
  if (validated === "") {
    clearErrors(subquery);
  } else if (validated instanceof SubqueryError) {
    subquery.queryError = validated.message;
  } else if (validated instanceof ValueError) {
    if (isComparisonSubquery(subquery)) {
      subquery.errors.inputValue = validated.message;
    } else {
      throw new Error(`Value error in operator query`, validated);
    }
  } else {
    throw validated;
  }
}
