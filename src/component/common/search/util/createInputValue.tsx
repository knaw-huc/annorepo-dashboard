import { ComparisonForm } from "../../../../model/query/QueryModel.ts";
import { toParamTag } from "../../../../store/query/util/toParamTag.ts";
import { toParamName } from "../../../../store/query/util/toParamName.ts";
import { findMapperByValueType } from "../../../../model/query/value/util/findMapperByValueType.ts";
import { ErroneousValue } from "../../../../model/query/ErrorRecord.ts";
import { ParamValue } from "../../../../model/query/ParamValue.ts";
import { PropertyName } from "lodash";

export function createInputValue(
  form: ComparisonForm,
  error: string,
  param: ParamValue,
  path: PropertyName[],
  /**
   * Creating a query to call? Versus creating a new custom query
   */
  isCall: boolean,
): string {
  const value = form.value;
  if (isCall) {
    // Creating a query to call: value is editable, possibly with error
    if (error) {
      return value as ErroneousValue;
    } else {
      return findMapperByValueType(form.valueType).toInputValue(value);
    }
  } else {
    // Creating new custom query: value is not editable, should not contain error
    if (error) {
      throw new Error("Custom query form should not contain errors");
    } else if (param) {
      return toParamTag(toParamName(form, path));
    } else {
      return findMapperByValueType(form.valueType).toInputValue(value);
    }
  }
}
