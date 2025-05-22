import {
  isRangeQueryOperator,
  NO_FIELD,
  QueryOperator
} from "../../../client/ArModel.ts";
import {useEffect} from "react";
import {SearchWithSuggestions} from "../form/SearchWithSuggestions.tsx";

export function QueryFieldInput(props: {
  value: string
  operator: QueryOperator
  suggestions: string[],
  onChange: (value: string) => void
  disabled?: boolean
}) {
  const {value, operator, suggestions, onChange} = props;

  useEffect(() => {
    if (value && isRangeQueryOperator(operator)) {
      onChange('')
    }
  }, [operator, onChange]);

  return <SearchWithSuggestions
    label="Field"
    disabled={props.disabled || isRangeQueryOperator(operator)}
    value={isRangeQueryOperator(operator) ? NO_FIELD : value}
    suggestions={suggestions}
    onChange={onChange}
  />
}
