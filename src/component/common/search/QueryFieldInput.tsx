import {isRangeQueryOperator, QueryOperator} from "../../../client/ArModel.ts";
import {DropdownInput} from "./DropdownInput.tsx";

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