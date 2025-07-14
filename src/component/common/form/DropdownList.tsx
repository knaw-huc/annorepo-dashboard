import {DropdownItem} from "./DropdownItem.tsx";
import {isEmpty} from "lodash";
import {SelectOption} from "./SelectOption.tsx";

export function DropdownList<T = string>(props: {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  suggestions: SelectOption<T>[]
  focussed: number | undefined
  onSelect: (item: SelectOption<T>) => void;
}) {
  const {isOpen, suggestions, focussed, onSelect} = props;

  let className = "absolute left-0 z-20 mt-2 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden";
  if (!isOpen) {
    className += ' hidden'
  }
  if (isEmpty(suggestions)) {
    return;
  }
  return <ul className={className}>
    <div className="py-1" role="none">
      {suggestions.map((s, i) =>
        <DropdownItem
          key={`${s.value}`}
          label={s.label}
          isFocussed={i === focussed}
          onClick={() => onSelect(s)}
        />
      )}
    </div>
  </ul>
}