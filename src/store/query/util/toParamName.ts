import {ComparisonSubQuery} from "../../../model/query/QueryModel.ts";
import {isRangeQueryOperator} from "../../../model/query/operator/RangeQueryOperator.ts";

export function toParamName(form: ComparisonSubQuery, formIndex: number): string {
  const key = isRangeQueryOperator(form.operator) ? form.operator : form.field;
  const cleanedKey = key
    .replaceAll(/[.]/g, '-')
    .replaceAll(/[:]/g, '')
  return `${formIndex + 1}-${cleanedKey}`
}