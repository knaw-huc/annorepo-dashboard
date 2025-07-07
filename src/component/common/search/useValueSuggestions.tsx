import {useDebounce} from "../../useDebounce.tsx";
import {
  useContainerFieldDistinctValues
} from "../../../client/endpoint/useContainerFieldDistinctValues.tsx";
import {isNumber, isString} from "lodash";
import {filterSuggestions} from "../form/util/filterSuggestions.tsx";
import {QueryValue} from "../../../model/query/value/QueryValue.ts";

export function useValueSuggestions(props: {
  containerName?: string,
  field: string,
  value: QueryValue,
}): string[] {
  const {field, value, containerName} = props;
  const fieldDebounced = useDebounce(field)
  const distinctValues = useContainerFieldDistinctValues(
    containerName ?? '',
    fieldDebounced
  )
  const distinctValueStrings = distinctValues.data
      ?.filter(v => isString(v) || isNumber(v))
      .map(v => `${v}`)
    ?? []
  return filterSuggestions(distinctValueStrings, value.toString())
}
