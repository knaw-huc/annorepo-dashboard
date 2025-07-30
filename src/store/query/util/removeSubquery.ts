import { QueryState } from "../QuerySlice.ts";
import { initial, PropertyName, remove, unset } from "lodash";
import { getOrThrow } from "./path/getOrThrow.ts";
import { revalidateInvalidSubqueries } from "./error/revalidateInvalidSubqueries.ts";

export function removeSubquery(
  toRemove: PropertyName[],
  prev: QueryState,
): QueryState {
  const update = structuredClone(prev.subqueries);
  unset(update, toRemove);

  // Remove empty slots:
  const parent = getOrThrow(update, initial(toRemove));
  remove(parent, (v) => v === undefined);

  revalidateInvalidSubqueries(update);

  return {
    ...prev,
    subqueries: update,
  };
}
