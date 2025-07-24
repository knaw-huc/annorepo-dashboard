import { QueryState } from "../QuerySlice.ts";
import { initial, PropertyName, remove, unset } from "lodash";
import { getOrThrow } from "./getOrThrow.ts";

export function removeSubquery(
  toRemove: PropertyName[],
  prev: QueryState,
): QueryState {
  const update = structuredClone(prev.subqueries);
  unset(update, toRemove);

  // Remove empty slots:
  if (toRemove.length > 1) {
    const parent = getOrThrow(update, initial(toRemove));
    remove(parent, (v) => v !== undefined);
  } else {
    remove(update, (v) => v !== undefined);
  }

  return {
    ...prev,
    subqueries: update,
  };
}
