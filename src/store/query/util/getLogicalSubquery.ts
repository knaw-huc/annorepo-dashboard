import {
  isLogicalSubquery,
  LogicalSubquery,
  Subquery,
} from "../../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";
import { getTypedSubquery } from "./getTypedSubquery.ts";

export function getLogicalSubquery(
  subqueries: Subquery[],
  path: PropertyName[],
): LogicalSubquery {
  return getTypedSubquery(subqueries, path, isLogicalSubquery);
}
