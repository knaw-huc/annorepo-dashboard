import { hasError } from "./hasError.ts";
import {
  isLogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";

export function hasErrors(subqueries: Subquery[]) {
  return subqueries.some((subquery) => {
    if (isLogicalSubquery(subquery)) {
      console.log("TODO: handle LogicalSubquery");
      return false;
    }
    return hasError(subquery.errors);
  });
}
