import {
  Subquery,
  isLogicalSubquery,
  isComparisonSubquery,
} from "../../../model/query/QueryModel.ts";

export function isPristine(subquery: Subquery): boolean {
  if (isComparisonSubquery(subquery)) {
    return subquery.isPristine;
  } else if (isLogicalSubquery(subquery)) {
    if (!subquery.forms.length) {
      return true;
    }
    return subquery.forms.every(isPristine);
  } else {
    throw new Error(`Unknown subquery: ${JSON.stringify(subquery)}`);
  }
}
