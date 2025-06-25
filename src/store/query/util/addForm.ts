import {QueryState} from "../QuerySlice.ts";
import {FormToAdd} from "../FormToAdd.ts";
import {validateQuery} from "./validateQuery.ts";

export function addForm(
  toAdd: FormToAdd,
  prev: QueryState
): QueryState {
  const {form, error, param} = toAdd
  const formsUpdate = [...prev.forms, form];
  const paramsUpdate = [...prev.params, param];

  if(!error.field) {
    // Validate when field does not contain error:
    error.field = validateQuery(formsUpdate, paramsUpdate);
  }
  const errorsUpdate = [...prev.errors, error];

  return {
    ...prev,
    forms: formsUpdate,
    errors: errorsUpdate,
    params: paramsUpdate
  }
}