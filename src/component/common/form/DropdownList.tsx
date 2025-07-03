import {DropdownItem} from "./DropdownItem.tsx";
import {isEmpty} from "lodash";

export function DropdownList(props: {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  suggestions: string[]
  focussed: number | undefined
  onSelect: (item: string) => void;
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
          key={s}
          label={s}
          isFocussed={i === focussed}
          onClick={() => onSelect(s)}
        />
      )}
    </div>
  </ul>
}