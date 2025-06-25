import {QueryState} from "../QuerySlice.ts";
import {FormUpdate} from "../FormUpdate.ts";
import {validateQuery} from "./validateQuery.ts";

export function updateForm(
  update: FormUpdate,
  prev: QueryState
): QueryState {
  const {formIndex, form, error, param} = update

  const formsUpdate = form !== undefined
    ? prev.forms.map(
      (f, i) => i === formIndex ? form : f
    )
    : prev.forms;
  const errorsUpdate = error !== undefined
    ? prev.errors.map(
      (e, i) => i === formIndex ? error : e
    ) : prev.errors;
  const paramsUpdate = param !== undefined
    ? prev.params.map(
      (p, i) => i === formIndex ? param : p
    ) : prev.params;

  // Assign generic form error to field:
  errorsUpdate[formIndex].field = validateQuery(formsUpdate, paramsUpdate);

  return {
    ...prev,
    forms: formsUpdate,
    errors: errorsUpdate,
    params: paramsUpdate
  }
}