import {
  ErrorRecord,
  FieldQueryForm
} from "../../../component/common/search/QueryModel.ts";
import {QuerySlice} from "../QuerySlice.ts";

export function updateForm(
  formIndex: number,
  formUpdate: FieldQueryForm,
  errorUpdate: FieldQueryErrors,
  prev: QuerySlice
) {
  const formsUpdate = prev.forms.map((
    form, i) => i === formIndex ? formUpdate : form
  );
  const errorsUpdate = prev.errors.map(
    (error, i) => i === formIndex ? errorUpdate : error
  );
  return {
    ...prev,
    forms: formsUpdate,
    errors: errorsUpdate
  }
}