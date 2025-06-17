import {QueryState} from "../QuerySlice.ts";

export function removeForm(
  toRemove: number,
  prev: QueryState
): QueryState {
  return {
    ...prev,
    forms: prev.forms.splice(toRemove, 1),
    errors: prev.errors.splice(toRemove, 1),
    params: prev.params.splice(toRemove, 1)
  }
}