import {DropdownInput} from "../form/DropdownInput.tsx";
import {Operator} from "../../../model/query/operator/Operator.ts";
import {isRangeQueryOperator} from "../../../model/query/operator/RangeQueryOperator.ts";
import {SelectOption} from "../form/SelectOption.tsx";

export function QueryFieldInput(props: {
  value: string
  errorLabel?: string
  // Only strings for query field keys:
  suggestions: SelectOption[]
  onChange: (value: string) => void
  disabled?: boolean,
  operator: Operator
}) {

  const {value, errorLabel, suggestions, onChange, operator} = props;

  const disabled = props.disabled || isRangeQueryOperator(operator)

  return <DropdownInput
    value={value}
    suggestions={suggestions}
    onInputChange={onChange}
    onSelect={o => onChange(o.value)}
    label="Field"
    errorLabel={errorLabel}
    disabled={disabled}
  />
}