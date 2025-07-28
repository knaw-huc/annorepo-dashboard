import { ComparisonForm } from "../../../model/query/QueryModel.ts";
import { isRangeQueryOperator } from "../../../model/query/operator/RangeQueryOperator.ts";
import { PropertyName } from "lodash";

export function toParamName(
  form: ComparisonForm,
  path: PropertyName[],
): string {
  const key = isRangeQueryOperator(form.operator) ? form.operator : form.field;
  const cleanedKey = key.replaceAll(/[.]/g, "-").replaceAll(/[:]/g, "");
  return `${path.join("-")}-${cleanedKey}`;
}
