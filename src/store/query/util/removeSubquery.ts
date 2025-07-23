import { QueryState } from "../QuerySlice.ts";
import { get, initial, PropertyName, remove, unset } from "lodash";

export function removeSubquery(
  toRemove: PropertyName[],
  prev: QueryState,
): QueryState {
  const update = structuredClone(prev.subqueries);
  unset(update, toRemove);

  // Remove empty slots:
  if (toRemove.length > 1) {
    const parent = get(update, initial(toRemove));
    remove(parent, (v) => v !== undefined);
  } else {
    remove(update, (v) => !v);
  }

  return {
    ...prev,
    subqueries: update,
  };
}
