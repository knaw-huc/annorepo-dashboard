import { ComparisonForm } from "../../../model/query/QueryModel.ts";
import { isRangeQueryOperator } from "../../../model/query/operator/RangeQueryOperator.ts";

export function toParamName(form: ComparisonForm, formIndex: number): string {
  const key = isRangeQueryOperator(form.operator) ? form.operator : form.field;
  const cleanedKey = key.replaceAll(/[.]/g, "-").replaceAll(/[:]/g, "");
  const result = `${formIndex + 1}-${cleanedKey}`;
  console.log(toParamName.name, { form, key, cleanedKey, result });
  return result;
}
