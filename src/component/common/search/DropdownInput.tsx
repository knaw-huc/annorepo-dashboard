import {DropdownNavigation} from "./DropdownNavigation.tsx";
import {InputWithLabel} from "../form/InputWithLabel.tsx";
import {DropdownList} from "../form/DropdownList.tsx";
import {useState} from "react";

export function DropdownInput(props: {
  value: string
  suggestions: string[]
  onChange: (update: string) => void
  label: string
  errorLabel?: string
  disabled?: boolean
  className?: string
}) {
  const {
    value,
    suggestions,
    onChange,
    label,
    errorLabel,
    disabled,
  } = props;
  const [focussed, setFocussed] = useState<number>();
  const [isOpen, setOpen] = useState(false);

  function handleChange(update: string) {
    onChange(update);
  }

  const handleSelect = (suggestion: string) => {
    setOpen(false)
    onChange(suggestion);
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
        handleChange(suggestions[update])
        setFocussed(undefined)
        setOpen(false)
      }}
    >
      <InputWithLabel
        label={label}
        errorLabel={errorLabel}
        value={value}
        onChange={handleChange}
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