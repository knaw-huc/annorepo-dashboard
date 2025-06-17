import {FieldQueryForm} from "../common/search/QueryModel.ts";
import {isString} from "lodash";
import {toQueryFieldForms} from "../../store/query/util/toQueryFieldForm.ts";
type ParamName = string
type ParamValue = string
export type CustomQueryParams = Record<ParamName, ParamValue>;

export function toCustomQueryParameters(
  forms: FieldQueryForm[],
  template: string,
  parameters: string[],
): CustomQueryParams {
  const templateForms = toQueryFieldForms(JSON.parse(template))
  const result: Record<string, string> = {}
  parameters.forEach(parameter => {
    const templateForm = templateForms.find(templateForm => isString(templateForm.value) && templateForm.value.includes(parameter))
    if (!templateForm) {
      throw new Error(`No template for parameter '${parameter}'`)
    }
    const templateField = templateForm.field
    const formField = forms.find(form => form.field === templateField)
    if (!formField) {
      throw new Error(`No form field found for for template field '${templateField}'`)
    }
    if (!isString(formField.value)) {
      throw new Error(`Parameter should be a string, but '${templateField}' was ${typeof formField}`)
    }
    result[parameter] = formField.value
  })
  return result;
}