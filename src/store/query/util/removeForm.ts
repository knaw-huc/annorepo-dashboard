import {QueryState} from "../QuerySlice.ts";

export function removeForm(
  toRemove: number,
  prev: QueryState
): QueryState {
  return {
    ...prev,
    forms: prev.forms.toSpliced(toRemove, 1),
    errors: prev.errors.toSpliced(toRemove, 1),
    params: prev.params.toSpliced(toRemove, 1)
  }
}