import {Down} from "../icon/Down";
import {useState} from "react";
import {DropdownItem} from "./DropdownItem.tsx";
import {SelectOption} from "./SelectOption.tsx";

export function Dropdown(props: {
  selectedValue: string
  options: SelectOption[],
  onSelect: (option: SelectOption) => void
  disabled?: boolean
}) {
  const options = props.options.filter(o => o.value !== props.selectedValue)

  const [isOpen, setOpen] = useState(false);

  let className = "absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden";
  if (!isOpen) {
    className += ' hidden'
  }

  function handleSelect(option: SelectOption) {
    setOpen(false)
    props.onSelect(option);
  }

  let buttonClassname = "w-full h-full justify-center rounded-md bg-white px-3 py-2 text-l ring-1 ring-gray-300 ring-inset border-b-2";
  buttonClassname += isOpen ? ' border-slate-600' : ' border-slate-400'
  buttonClassname += props.disabled ? ' cursor-not-allowed  text-gray-400' : ' hover:bg-gray-50 text-gray-900'

  return <div
    className="relative inline-block text-left h-full"
  >
    <button
      disabled={props.disabled}
      onClick={() => setOpen(!isOpen)}
      type="button"
      className={buttonClassname}
      onBlur={() => setTimeout(() => setOpen(false), 200)}
    >
      {props.options.find(o => o.value === props.selectedValue)?.label || 'Select below'}
      <Down className="text-slate-400 ml-2" />
    </button>
    <ul
      className={className}
    >
      <div className="py-1" role="none">
        {options.map(o =>
          <DropdownItem
            key={o.value}
            label={o.label}
            onClick={() => handleSelect(o)}
          />
        )}
      </div>
    </ul>
  </div>
}

