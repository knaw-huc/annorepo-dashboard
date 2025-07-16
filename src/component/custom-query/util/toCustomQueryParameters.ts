import {
  ComparisonSubQuery
} from "../../../model/query/QueryModel.ts";
import {
  findMapperByType
} from "../../../model/query/value/util/findMapperByType.ts";
import {CustomQueryParams} from "../model/CustomQueryParams.ts";
import {FormParamValue} from "../../../model/query/FormParamValue.ts";

export function toCustomQueryParameters(
  forms: ComparisonSubQuery[],
  parameters: FormParamValue[],
): CustomQueryParams {
  const result: CustomQueryParams = {}
  for (let index = 0; index < parameters.length; index++){
    const parameter = parameters[index];
    if(parameter === false) {
      continue;
    }
    const form = forms[index];
    const mapper = findMapperByType(form.valueType);
    result[parameter] = mapper.toParameterValue(form.value)
  }
  console.log('toCustomQueryParameters', {forms, parameters, result})
  return result;
}