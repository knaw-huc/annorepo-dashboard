import { QueryState } from "../QuerySlice.ts";
import { SubqueryToAdd } from "../SubqueryToAdd.ts";
import { validateQuery } from "./validateQuery.ts";
import { set } from "lodash";
import { isComparisonSubquery } from "../../../model/query/QueryModel.ts";

export function addSubquery(
  toAdd: SubqueryToAdd,
  prev: QueryState,
): QueryState {
  const { subquery, path } = toAdd;
  const update = structuredClone(prev.subqueries);
  set(update, path, subquery);

  if (isComparisonSubquery(subquery) && !subquery.errors.field) {
    // Check newly added subquery does not invalidate query:
    subquery.errors.field = validateQuery(update);
  }

  return {
    ...prev,
    subqueries: update,
  };
}
