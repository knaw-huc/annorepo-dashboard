import {
  isComparisonSubquery,
  Subquery,
} from "../../../../model/query/QueryModel.ts";
import { Any } from "../../../../model/Any.ts";

export function clearErrors(subquery: Subquery) {
  subquery.queryError = "";
  if (isComparisonSubquery(subquery)) {
    const errors = subquery.errors;
    for (const key in errors) {
      (subquery.errors as Any)[key] = "";
    }
  }
}
