import {QuerySlice} from "../QuerySlice.ts";

export function removeForm(
  toRemove: number,
  prev: QuerySlice
): QuerySlice {
  return {
    ...prev,
    forms: prev.forms.splice(toRemove, 1),
    errors: prev.errors.splice(toRemove, 1),
    params: prev.params.splice(toRemove, 1)
  }
}