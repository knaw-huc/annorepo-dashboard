import {
  isComparisonSubquery,
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { validateQuery } from "./validateQuery.ts";

/**
 * Check subquery does not invalidate query
 * Only validate when no error already present
 */
export function validateSubquery(subquery: Subquery, query: Subquery[]) {
  if (isComparisonSubquery(subquery) && !subquery.errors.field) {
    subquery.errors.field = validateQuery(query);
  }

  if (isLogicalSubquery(subquery) && !subquery.error) {
    subquery.error = validateQuery(query);
  }
}
