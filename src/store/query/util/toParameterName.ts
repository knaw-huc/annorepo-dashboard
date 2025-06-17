import {FieldQueryForm} from "../../../component/common/search/QueryModel.ts";
import {isRangeQueryOperator} from "../../../client/ArModel.ts";

export function toParameterName(query: FieldQueryForm, formIndex: number): string {
  const key = isRangeQueryOperator(query.operator) ? query.operator : query.field;
  const cleanedKey = key
    .replaceAll(/[.]/g, '-')
    .replaceAll(/[:]/g, '')
  return `<${formIndex+1}-${cleanedKey}>`
}