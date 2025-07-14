import {ErroneousValue, FieldQueryForm, FormParamValue} from "../QueryModel.ts";
import {toParamTag} from "../../../../store/query/util/toParamTag.ts";
import {toParamName} from "../../../../store/query/util/toParamName.ts";
import {findMapperByType} from "../../../../model/query/value/util/findMapperByType.ts";

export function createInputValue(
  form: FieldQueryForm,
  error: string,
  param: FormParamValue,
  formIndex: number,
  isCall: boolean
): string {
  const value = form.value
  if (isCall) {
    // Creating a query to call: value is editable, possibly with error
    if (error) {
      return value as ErroneousValue
    } else {
      return findMapperByType(form.valueType).toInputValue(value)
    }
  } else {
    // Creating new custom query: value is not editable, should not contain error
    if (error) {
      throw new Error('Custom query form should not contain errors')
    } else if (param) {
      return toParamTag(toParamName(form, formIndex))
    } else {
      return findMapperByType(form.valueType).toInputValue(value)
    }
  }
}