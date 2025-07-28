import { hasError } from "./hasError.ts";
import {
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";

export function hasErrors(subqueries: Subquery[]): boolean {
  return subqueries.some((subquery) => {
    if (isLogicalSubquery(subquery)) {
      if (subquery.error) {
        return true;
      }
      return hasErrors(subquery.forms);
    }
    return hasError(subquery.errors);
  });
}
