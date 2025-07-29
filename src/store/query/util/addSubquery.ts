import { QueryState } from "../QuerySlice.ts";
import { SubqueryToAdd } from "../SubqueryToAdd.ts";
import { set } from "lodash";
import { validateSubquery } from "./validateSubquery.ts";

export function addSubquery(
  toAdd: SubqueryToAdd,
  prev: QueryState,
): QueryState {
  const { subquery, path } = toAdd;
  const update = structuredClone(prev.subqueries);
  set(update, path, subquery);

  validateSubquery(path, update);

  console.debug(addSubquery.name, { toAdd, prev, update });

  return {
    ...prev,
    subqueries: update,
  };
}
