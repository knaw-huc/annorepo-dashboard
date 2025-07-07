import {DropdownInput} from "../form/DropdownInput.tsx";
import {QueryOperator} from "../../../model/query/operator/QueryOperator.ts";
import {isRangeQueryOperator} from "../../../model/query/operator/RangeQueryOperator.ts";

export function QueryFieldInput(props: {
  value: string
  errorLabel?: string
  suggestions: string[]
  onChange: (value: string) => void
  disabled?: boolean,
  operator: QueryOperator
}) {

  const {value, errorLabel, suggestions, onChange, operator} = props;

  const disabled = props.disabled || isRangeQueryOperator(operator)

  return <DropdownInput
    value={value}
    suggestions={suggestions}
    onChange={onChange}
    label="Field"
    errorLabel={errorLabel}
    disabled={disabled}
  />
}