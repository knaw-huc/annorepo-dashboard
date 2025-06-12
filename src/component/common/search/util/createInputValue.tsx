import {ErroneousValue, FieldQueryForm, ParamValue} from "../QueryModel.ts";
import {toParameterName} from "../../../../store/query/util/toParameterName.ts";
import {findMapping} from "./findMapping.tsx";

export function createInputValue(
  form: FieldQueryForm,
  error: string,
  param: ParamValue,
  isCustom: boolean,
  formIndex: number
): string {
  const operator = form.operator
  const value = form.value
  if (isCustom) {
    // Creating custom query: value is not editable, should not contain error
    if (error) {
      throw new Error('Custom query form should not contain errors')
    } else if (param) {
      return toParameterName(form, formIndex)
    } else {
      return findMapping(operator).toString(value)
    }
  } else {
    // Creating global query: value is editable, possibly with error
    if (error) {
      return value as ErroneousValue
    } else {
      return findMapping(operator).toString(value)
    }
  }
}