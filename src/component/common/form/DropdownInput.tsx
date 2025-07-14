import {DropdownNavigation} from "./DropdownNavigation.tsx";
import {InputWithLabel} from "./InputWithLabel.tsx";
import {DropdownList} from "./DropdownList.tsx";
import {useState} from "react";
import {SelectOption} from "./SelectOption.tsx";

export function DropdownInput<T = string>(props: {
  value: string
  suggestions: SelectOption<T>[]
  onInputChange: (update: string) => void
  onSelect: (update: SelectOption<T>) => void
  label: string
  errorLabel?: string
  disabled?: boolean
  className?: string
}) {
  const {
    value,
    suggestions,
    onInputChange,
    onSelect,
    label,
    errorLabel,
    disabled,
  } = props;
  const [focussed, setFocussed] = useState<number>();
  const [isOpen, setOpen] = useState(false);

  function handleInputChange(update: string) {
    onInputChange(update);
  }

  const handleSelect = (suggestion: SelectOption<T>) => {
    setOpen(false)
    onSelect(suggestion)
  }

  let className = 'relative'
  if (props.className) {
    className += ` ${props.className}`
  }

  return <div className={className}>
    <DropdownNavigation
      suggestions={props.suggestions.length}
      focussed={focussed}
      onFocus={setFocussed}
      onSelect={(update) => {
        handleSelect(suggestions[update])
        setFocussed(undefined)
        setOpen(false)
      }}
    >
      <InputWithLabel
        label={label}
        errorLabel={errorLabel}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        // Use timeout to prevent suggestions to disappear before being clicked:
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        disabled={disabled}
        autoComplete='off'
      />
      <DropdownList
        isOpen={isOpen}
        setOpen={setOpen}
        suggestions={suggestions}
        focussed={focussed}
        onSelect={handleSelect}
      />
    </DropdownNavigation>
  </div>
}