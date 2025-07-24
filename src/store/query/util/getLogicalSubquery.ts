import {
  isLogicalSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";
import { getSubqueryByType } from "./getSubqueryByType.ts";

export function getLogicalSubquery(
  subqueries: Subquery[],
  path: PropertyName[],
): LogicalSubquery {
  return getSubqueryByType(subqueries, path, isLogicalSubquery);
}
