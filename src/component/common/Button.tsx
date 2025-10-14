import { PropsWithChildren } from "react";

export function Button(
  props: PropsWithChildren<{
    onClick: () => void;
    className?: string;
    disabled?: boolean;
  }>,
) {
  let className = "rounded-full border px-3 py-1 text-sm transition";

  className += props.disabled ? " cursor-not-allowed" : " cursor-pointer";

  if (props.className) {
    className += ` ${props.className}`;
  }

  return (
    <button
      onClick={props.onClick}
      className={className}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
