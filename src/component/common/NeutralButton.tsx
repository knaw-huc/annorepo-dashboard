import { PropsWithChildren } from "react";
import { Button } from "./Button.tsx";

export function NeutralButton(
  props: PropsWithChildren<{
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    borderColor?: string;
  }>,
) {
  let className =
    "text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400  bg-neutral-100";
  if (props.className) {
    className += ` ${props.className}`;
  }
  className += ` ${props.borderColor ?? "border-neutral-200"}`;

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
