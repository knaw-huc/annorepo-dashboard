import {QuerySlice} from "../QuerySlice.ts";
import {toSearchQuery} from "./toSearchQuery.ts";
import {FormToAdd} from "../FormToAdd.ts";

export function addForm(
  toAdd: FormToAdd,
  prev: QuerySlice
): QuerySlice {
  const {form, error, param} = toAdd
  const forms = [...prev.forms, form];
  try {
    // Computer says ...
    toSearchQuery(forms, prev.params)
  } catch (e) {
    error.field = e instanceof Error
      ? e.message
      : 'New subquery causes unknown error'
  }
  return {
    ...prev,
    forms: forms,
    errors: [...prev.errors, error],
    params: [...prev.params, param]
  }
}