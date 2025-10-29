import { useRef } from "react";

export type CheckboxValue = "checked" | "unchecked" | "indeterminate";

export function Checkbox(props: {
  value: CheckboxValue;
  title?: string;
  onClick: () => void;
  className?: string;
}) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  if (checkboxRef.current) {
    checkboxRef.current.checked = props.value === "checked";
    checkboxRef.current.indeterminate = props.value === "indeterminate";
  }

  let className = "cursor-pointer";
  if (props.className) {
    className += ` ${props.className}`;
  }

  return (
    <input
      type="checkbox"
      ref={checkboxRef}
      onClick={props.onClick}
      className={className}
      title={props.title}
    />
  );
}
