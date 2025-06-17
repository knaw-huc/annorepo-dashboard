import {SearchQuery} from "../../../client/ArModel.ts";
import {toQueryFieldForms} from "./toQueryFieldForm.ts";
import {toErrorRecord} from "./toErrorRecord.ts";

export function initWithTemplate(template: SearchQuery, paramNames: string[]) {
  const forms = toQueryFieldForms(template, paramNames)
  const errors = forms.map(f => toErrorRecord(f))
  const params = forms.map(f => {
    const foundParamName = paramNames.find(
      paramName => f.value.toString().includes(paramName)
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
