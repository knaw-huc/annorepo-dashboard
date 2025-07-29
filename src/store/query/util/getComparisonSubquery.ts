import {
  ComparisonSubquery,
  isComparisonSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";
import { getTypedSubquery } from "./getTypedSubquery.ts";

export function getComparisonSubquery(
  subqueries: Subquery[],
  path: PropertyName[],
): ComparisonSubquery {
  return getTypedSubquery(subqueries, path, isComparisonSubquery);
}
