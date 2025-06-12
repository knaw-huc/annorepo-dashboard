import {
  isRangeQueryOperator,
  NO_FIELD,
  QueryOperator
} from "../../../client/ArModel.ts";
import {SearchWithSuggestions} from "../form/SearchWithSuggestions.tsx";

export function QueryFieldInput(props: {
  value: string
  errorLabel?: string
  operator: QueryOperator
  suggestions: string[],
  onChange: (value: string) => void
  disabled?: boolean
}) {
  const {value, operator, suggestions, onChange} = props;

  return <SearchWithSuggestions
    errorLabel={props.errorLabel}
    label="Field"
    disabled={props.disabled || isRangeQueryOperator(operator)}
    value={isRangeQueryOperator(operator) ? NO_FIELD : value}
    suggestions={suggestions}
    onChange={onChange}
  />
}
