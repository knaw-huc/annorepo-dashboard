import {
  FieldQueryForm,
  FormParamValue
} from "../../common/search/QueryModel.ts";
import {findMapperByType} from "../../common/search/util/findMapperByType.tsx";

type ParamName = string
type ParamValue = string
export type CustomQueryParams = Record<ParamName, ParamValue>;

export function toCustomQueryParameters(
  forms: FieldQueryForm[],
  parameters: FormParamValue[],
): CustomQueryParams {
  const result: Record<string, string> = {}
  for (let index = 0; index < parameters.length; index++){
    const parameter = parameters[index];
    if(parameter === false) {
      continue;
    }
    const form = forms[index];
    result[parameter] = findMapperByType(form.valueType).toString(form.value)
  }
  return result;
}