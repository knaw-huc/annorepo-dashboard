import {Down} from "../icon/Down";
import {useState} from "react";

export type DropdownOption = { label: string, value: string };

export function Dropdown(props: {
  selectedValue: string
  options: DropdownOption[],
  onSelect: (option: DropdownOption) => void
}) {
  const options = props.options.filter(o => o.value !== props.selectedValue)

  const [isOpen, setOpen] = useState(false);

  let className = "absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden";
  if(!isOpen) {
    className += ' hidden'
  }

  function handleSelect(option: DropdownOption) {
    setOpen(false)
    props.onSelect(option);
  }

  return <div className="relative inline-block text-left">
    <div>
      <button
        onClick={() => setOpen(!isOpen)}
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        {props.options.find(o => o.value === props.selectedValue)?.label || 'Select below'}
        <Down/>
      </button>
    </div>
    <ul
      className={className}
    >
      <div className="py-1" role="none">
        {options.map(o =>
          <DropdownItem label={o.label} onClick={() => handleSelect(o)}/>
          )}
      </div>
    </ul>
  </div>
}

export function DropdownItem(props: {
  label: string
  onClick: () => void
}) {
  return <li
    onClick={props.onClick}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
  >
    {props.label}
  </li>
}