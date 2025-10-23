import { PropsWithChildren } from "react";
import { Button } from "./Button.tsx";

export function NeutralButton(
  props: PropsWithChildren<{
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    colors?: string;
  }>,
) {
  let className = " hover:bg-neutral-50  ";
  if (props.className) {
    className += ` ${props.className}`;
  }
  if (props.disabled) {
    className += ` border-neutral-100 bg-neutral-50 text-neutral-500`;
  } else if (props.colors) {
    className += ` ${props.colors}`;
  } else {
    className += ` border-neutral-200 hover:border-neutral-400 bg-neutral-100 text-neutral-800`;
  }

  return (
    <Button
      onClick={props.onClick}
      className={className}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
}
