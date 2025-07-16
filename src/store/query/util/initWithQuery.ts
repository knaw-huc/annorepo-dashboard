import {SearchQueryJson} from "../../../model/ArModel.ts";
import {toQueryFieldForms} from "./toQueryFieldForm.ts";
import {toErrorRecord} from "./toErrorRecord.ts";


import {FormParamValue} from "../../../model/query/FormParamValue.ts";

export function initWithQuery(query: SearchQueryJson) {
  const forms = toQueryFieldForms(query)
  const errors = forms.map(f => toErrorRecord(f))
  const params = forms.map(() => false as FormParamValue)
  return {
    forms,
    errors,
    params
  };
}