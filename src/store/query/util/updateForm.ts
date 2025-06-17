import {QueryState} from "../QuerySlice.ts";
import {FormUpdate} from "../FormUpdate.ts";

export function updateForm(
  update: FormUpdate,
  prev: QueryState
): QueryState {
  const {formIndex, form, error, param} = update
  return {
    ...prev,
    forms: form !== undefined
      ? prev.forms.map(
        (f, i) => i === formIndex ? form : f
      )
      : prev.forms,
    errors: error !== undefined
      ? prev.errors.map(
        (e, i) => i === formIndex ? error : e
      ) : prev.errors,
    params: param !== undefined
      ? prev.params.map(
        (p, i) => i === formIndex ? param : p
      ) : prev.params
  }
}