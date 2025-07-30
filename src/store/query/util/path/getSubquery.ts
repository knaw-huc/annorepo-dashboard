import { isSubquery, Subquery } from "../../../../model/query/QueryModel.ts";
import { PropertyName } from "lodash";
import { getTypedSubquery } from "./getTypedSubquery.ts";

export function getSubquery(
  subqueries: Subquery[],
  path: PropertyName[],
): Subquery {
  return getTypedSubquery(subqueries, path, isSubquery);
}
