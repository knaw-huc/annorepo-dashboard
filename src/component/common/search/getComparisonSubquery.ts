import {
  ComparisonSubquery,
  isComparisonSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { get, PropertyName } from "lodash";

export function getComparisonSubquery(
  subqueries: Subquery[],
  path: PropertyName[],
): ComparisonSubquery {
  const subquery = get(subqueries, path);
  if (!isComparisonSubquery(subquery)) {
    throw new Error("Expected comparison subquery");
  }
  return subquery;
}
