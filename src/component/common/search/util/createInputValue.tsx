import {ErroneousValue, FieldQueryForm, FormParamValue} from "../QueryModel.ts";
import {toParamTag} from "../../../../store/query/util/toParamTag.ts";
import {findMapper} from "./findMapper.tsx";
import {toParamName} from "../../../../store/query/util/toParamName.ts";

export function createInputValue(
  form: FieldQueryForm,
  error: string,
  param: FormParamValue,
  formIndex: number,
  isCall: boolean
): string {
  const operator = form.operator
  const value = form.value
  if (isCall) {
    // Creating a query to call: value is editable, possibly with error
    if (error) {
      return value as ErroneousValue
    } else {
      return findMapper(operator).toString(value)
    }
  } else {
    // Creating new custom query: value is not editable, should not contain error
    if (error) {
      throw new Error('Custom query form should not contain errors')
    } else if (param) {
      return toParamTag(toParamName(form, formIndex))
    } else {
      return findMapper(operator).toString(value)
    }
  }
}