import {ValidatedComparisonSubQuery} from "../../../model/query/QueryModel.ts";
import {
  findMapperByType
} from "../../../model/query/value/util/findMapperByType.ts";
import {CustomQueryParams} from "../model/CustomQueryParams.ts";
import {FormParamValue} from "../../../model/query/FormParamValue.ts";

export function toCustomQueryParameters(
  subqueries: ValidatedComparisonSubQuery[],
  parameters: FormParamValue[],
): CustomQueryParams {
  const result: CustomQueryParams = {}
  for (let index = 0; index < parameters.length; index++){
    const parameter = parameters[index];
    if(parameter === false) {
      continue;
    }
    const subquery = subqueries[index];
    const mapper = findMapperByType(subquery.form.valueType);
    result[parameter] = mapper.toParameterValue(subquery.form.value)
  }
  console.log('toCustomQueryParameters', {subqueries, parameters, result})
  return result;
}