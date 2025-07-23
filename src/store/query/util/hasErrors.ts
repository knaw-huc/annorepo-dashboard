import { hasError } from "./hasError.ts";
import { ComparisonSubquery } from "../../../model/query/QueryModel.ts";

export function hasErrors(subqueries: ComparisonSubquery[]) {
  return subqueries.some((sq) => hasError(sq.errors));
}
