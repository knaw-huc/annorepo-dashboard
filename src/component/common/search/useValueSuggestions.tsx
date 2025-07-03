import {QueryValue} from "../../../client/ArModel.ts";
import {useDebounce} from "../../useDebounce.tsx";
import {
  useContainerFieldDistinctValues
} from "../../../client/endpoint/useContainerFieldDistinctValues.tsx";
import {isNumber, isString} from "lodash";

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
  return value
    ? distinctValueStrings.filter(name => name.includes(value.toString()))
    : distinctValueStrings
}
