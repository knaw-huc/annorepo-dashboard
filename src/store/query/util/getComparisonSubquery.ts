import {
  ComparisonSubquery,
  isComparisonSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";
import { getSubqueryByType } from "./getSubqueryByType.ts";

export function getComparisonSubquery(
  subqueries: Subquery[],
  path: PropertyName[],
): ComparisonSubquery {
  return getSubqueryByType(subqueries, path, isComparisonSubquery);
}
