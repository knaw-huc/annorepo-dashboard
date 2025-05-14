import {InputWithLabel} from "./InputWithLabel.tsx";
import {DropdownItem} from "./DropdownItem.tsx";
import {useState} from "react";
import {isEmpty} from "lodash";

export function SearchWithSuggestions(props: {
  label: string
  value: string
  suggestions: string[]
  onChange: (value: string) => void
  disabled: boolean
}) {

  const {label, value, suggestions, onChange} = props;

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

  return <div>
    <div className="relative">
      <InputWithLabel
        value={value}
        label={label}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        // Use timeout to prevent suggestions to disappear before being clicked:
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        disabled={props.disabled}
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