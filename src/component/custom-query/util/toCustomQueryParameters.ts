import {ValidatedComparisonSubQuery} from "../../../model/query/QueryModel.ts";
import {
  findMapperByValueType
} from "../../../model/query/value/util/findMapperByValueType.ts";
import {CustomQueryParams} from "../model/CustomQueryParams.ts";

export function toCustomQueryParameters(
  subqueries: ValidatedComparisonSubQuery[]
): CustomQueryParams {
  const result: CustomQueryParams = {}
  for (let index = 0; index < subqueries.length; index++){
    const subquery = subqueries[index];
    const parameter = subquery.param;
    if(parameter === false) {
      continue;
    }
    const mapper = findMapperByValueType(subquery.form.valueType);
    result[parameter] = mapper.toParamValue(subquery.form.value)
  }
  console.log('toCustomQueryParameters', {subqueries, result})
  return result;
}