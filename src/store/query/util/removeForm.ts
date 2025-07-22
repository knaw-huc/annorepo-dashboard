import {QueryState} from "../QuerySlice.ts";

export function removeForm(
  toRemove: number,
  prev: QueryState
): QueryState {
  return {
    ...prev,
    subqueries: prev.subqueries.toSpliced(toRemove, 1),
  }
}