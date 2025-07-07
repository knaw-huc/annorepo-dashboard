import {Down} from "../icon/Down";
import {ReactNode, useState} from "react";
import {DropdownItem} from "./DropdownItem.tsx";
import {SelectOption} from "./SelectOption.tsx";

export function DropdownSelector<T>(props: {
  placeholder?: ReactNode,
  selectedValue?: string,
  options: SelectOption<T>[],
  onSelect: (option: SelectOption<T>) => void
  className?: string
  disabled?: boolean
}) {
  const options = props.options.filter(o => o.value !== props.selectedValue)

  const [isOpen, setOpen] = useState(false);
  let className = "relative inline-block text-left";
  if(props.className) {
    className += ` ${props.className}`
  }
  let optionsClassName = "absolute right-0 z-20 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden";
  if (!isOpen) {
    optionsClassName += ' hidden'
  }

  function handleSelect(option: SelectOption<T>) {
    setOpen(false)
    props.onSelect(option);
  }

  let buttonClassname = "w-full h-full justify-center rounded-md bg-white px-3 py-2 text-l ring-1 ring-gray-300 ring-inset border-b-2";
  buttonClassname += isOpen ? ' border-slate-600' : ' border-slate-400'
  buttonClassname += props.disabled ? ' cursor-not-allowed  text-gray-400' : ' hover:bg-gray-50 text-gray-900'

  return <div
    className={className}
  >
    <button
      disabled={props.disabled}
      onClick={() => setOpen(!isOpen)}
      type="button"
      className={buttonClassname}
      onBlur={() => setTimeout(() => setOpen(false), 200)}
    >
      {props.options.find(o => o.value === props.selectedValue)?.label || props.placeholder || 'Select below'}
      <Down className="text-slate-400 ml-2" />
    </button>
    {!!options.length && <ul
      className={optionsClassName}
    >
      <div className="py-1" role="none">
        {options.map(option =>
          <DropdownItem
            key={`${option.value}`}
            label={option.label}
            onClick={() => handleSelect(option)}
          />
        )}
      </div>
    </ul>}
  </div>
}

