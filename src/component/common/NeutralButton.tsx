import { PropsWithChildren } from "react";
import { Button } from "./Button.tsx";

export function NeutralButton(
  props: PropsWithChildren<{
    onClick: () => void;
    className?: string;
  }>,
) {
  let className =
    "text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 border-neutral-200 bg-neutral-100";
  if (props.className) {
    className += ` ${props.className}`;
  }

  return (
    <Button onClick={props.onClick} className={className}>
      {props.children}
    </Button>
  );
}
