import {useDebounce} from "../../useDebounce.tsx";
import {
  useContainerFieldDistinctValues
} from "../../../client/endpoint/useContainerFieldDistinctValues.tsx";
import {filterSuggestions} from "../form/util/filterSuggestions.tsx";
import {QueryValue} from "../../../model/query/value/QueryValue.ts";
import {SelectOption, toOption} from "../form/SelectOption.tsx";

export function useValueSuggestions<T = QueryValue>(props: {
  containerName?: string,
  field: string,
  value: T,
}): SelectOption<T>[] {
  const {field, value, containerName} = props;
  const fieldDebounced = useDebounce(field)
  const distinctValues = useContainerFieldDistinctValues(
    containerName ?? '',
    fieldDebounced
  )
  const options = distinctValues.data?.map(toOption) ?? [];
  return filterSuggestions(
    options,
    value?.toString() || ''
  ) as SelectOption<T>[]
}
