import { ComparisonForm } from "../../../../model/query/QueryModel.ts";
import { toParamTag } from "../../../../store/query/util/toParamTag.ts";
import { toParamName } from "../../../../store/query/util/toParamName.ts";
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
  const inputValue = form.inputValue;
  if (isCall) {
    return inputValue;
  } else {
    // Creating new custom query: value is not editable, should not contain error
    if (error) {
      throw new Error("Custom query form should not contain errors");
    } else if (param) {
      return toParamTag(toParamName(form, path));
    } else {
      return inputValue;
    }
  }
}
