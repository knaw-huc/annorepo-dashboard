import {Dispatch, PropsWithChildren, SetStateAction} from "react";

export function DropdownNavigation(props: PropsWithChildren<{
  suggestions: number
  focussed: number | undefined
  onFocus: Dispatch<SetStateAction<number | undefined>>
  onSelect: (selectedIndex: number) => void
}>) {
  const {suggestions, onSelect, onFocus, focussed} = props;

  function handleKeyboardNavigation(
    event: { key: string; }
  ) {
    if (event.key === 'ArrowDown') {
      onFocus(prev => {
        if (!suggestions) {
          return;
        } else if (prev === undefined) {
          return 0;
        } else if (prev === suggestions - 1) {
          return prev;
        } else {
          return prev + 1;
        }
      })
    } else if (event.key === 'ArrowUp') {
      onFocus(prev => {
        if (!suggestions) {
          return;
        } else if (prev === undefined) {
          return suggestions - 1;
        } else if (prev === 0) {
          return prev;
        } else {
          return prev - 1;
        }
      })
    } else if (event.key === 'Enter') {
      if (focussed === undefined) {
        return;
      } else {
        onSelect(focussed)
      }
    }
  }

  return <span
    onKeyUp={handleKeyboardNavigation}
  >
    {props.children}
  </span>
}