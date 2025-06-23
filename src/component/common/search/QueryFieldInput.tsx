import {useState} from "react";
import {isEmpty} from "lodash";
import {InputWithLabel} from "../form/InputWithLabel.tsx";
import {DropdownItem} from "../form/DropdownItem.tsx";
import {isRangeQueryOperator, QueryOperator} from "../../../client/ArModel.ts";

export function QueryFieldInput(props: {
  value: string
  errorLabel?: string
  suggestions: string[]
  onChange: (value: string) => void
  disabled?: boolean,
  operator: QueryOperator
}) {

  const {value, suggestions, onChange, operator} = props;

  const [isOpen, setOpen] = useState(false);
  let className = "absolute left-0 z-20 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden";
  if (!isOpen) {
    className += ' hidden'
  }

  function handleChange(update: string) {
    onChange(update);
  }

  const handleSelect = (suggestion: string) => {
    setOpen(false)
    onChange(suggestion);
  }

  const disabled = props.disabled || isRangeQueryOperator(operator)

  return <div>
    <div className="relative">
      <InputWithLabel
        value={value}
        errorLabel={props.errorLabel}
        label="Field"
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        // Use timeout to prevent suggestions to disappear before being clicked:
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        disabled={disabled}
      />
      {!isEmpty(suggestions) && <ul
        className={className}
      >
        <div className="py-1" role="none">
          {suggestions.map(s =>
            <DropdownItem
              key={s}
              label={s}
              onClick={() => handleSelect(s)}
            />
          )}
        </div>
      </ul>}
    </div>
  </div>
}