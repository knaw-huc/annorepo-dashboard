import { hasFormErrors } from "./hasFormErrors.ts";
import {
  isComparisonSubquery,
  isLogicalSubquery,
  Subquery,
} from "../../../../model/query/QueryModel.ts";

export function hasErrors(subqueries: Subquery[]): boolean {
  return subqueries.some((subquery) => {
    if (subquery.queryError) {
      return true;
    }
    if (isComparisonSubquery(subquery)) {
      return hasFormErrors(subquery.errors);
    } else if (isLogicalSubquery(subquery)) {
      return hasErrors(subquery.forms);
    }
  });
}
