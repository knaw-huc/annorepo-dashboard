import {SearchQuery} from "../../../client/ArModel.ts";
import {toQueryFieldForms} from "./toQueryFieldForm.ts";
import {toErrorRecord} from "./toErrorRecord.ts";

export function initWithTemplate(query: SearchQuery, paramNames: string[]) {
  const forms = toQueryFieldForms(query)
  const errors = forms.map(f => toErrorRecord(f))
  const params = forms.map(f => {
    const foundParamName = paramNames.find(
      p => p === f.value.toString()
    );
    return foundParamName
      ? foundParamName
      : false
  })
  return {
    forms,
    errors,
    params
  };
}