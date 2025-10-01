import { ReactNode } from "react";

export function DropdownItem(props: {
  label: string | ReactNode;
  isFocussed?: boolean;
  onClick: () => void;
}) {
  const { label, isFocussed } = props;

  let className = "block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100";
  if (isFocussed === true) {
    className += ` bg-slate-100`;
  }

  return (
    <li onClick={props.onClick} className={className}>
      {label || <>&nbsp;</>}
    </li>
  );
}
