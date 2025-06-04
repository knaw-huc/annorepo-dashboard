import {FieldQueryForm} from "../common/search/QueryModel.ts";
import {isString} from "lodash";

export function toCustomQueryParameters(
  forms: FieldQueryForm[],
  templateForms: FieldQueryForm[],
  parameters: string[],
): Record<string, string> {
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