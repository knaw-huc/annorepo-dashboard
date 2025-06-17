import {SearchQuery} from "../../../client/ArModel.ts";
import {toQueryFieldForms} from "./toQueryFieldForm.ts";
import {toErrorRecord} from "./toErrorRecord.ts";

export function initWithTemplate(template: SearchQuery, paramNames: string[]) {
  const forms = toQueryFieldForms(template, paramNames)
  const errors = forms.map(f => toErrorRecord(f))
  const params = Object.values(template).map(templateEntryValue => {
    const foundParamName = paramNames.find(
      paramName => JSON.stringify(templateEntryValue).includes(paramName)
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
