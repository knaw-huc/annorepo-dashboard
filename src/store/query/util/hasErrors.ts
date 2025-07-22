import {hasError} from "./hasError.ts";
import {ValidatedComparisonSubQuery} from "../../../model/query/QueryModel.ts";

export function hasErrors(subqueries: ValidatedComparisonSubQuery[]) {
  return subqueries.some(sq => hasError(sq.errors));
}