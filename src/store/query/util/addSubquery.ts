import { QueryState } from "../QuerySlice.ts";
import { SubqueryToAdd } from "../SubqueryToAdd.ts";
import { set } from "lodash";
import { validateSubquery } from "./error/validateSubquery.ts";
import { revalidateInvalidSubqueries } from "./error/revalidateInvalidSubqueries.ts";

export function addSubquery(
  toAdd: SubqueryToAdd,
  prev: QueryState,
): QueryState {
  const { subquery, path } = toAdd;
  const update = structuredClone(prev.subqueries);
  set(update, path, subquery);

  validateSubquery(path, update);
  revalidateInvalidSubqueries(update);

  return {
    ...prev,
    subqueries: update,
  };
}
