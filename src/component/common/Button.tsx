import { PropsWithChildren } from "react";

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

export function Button(
  props: PropsWithChildren<{
    onClick: () => void;
    className?: string;
  }>,
) {
  let className =
    "rounded-full border px-3 py-1 text-sm cursor-pointer transition";
  if (props.className) {
    className += ` ${props.className}`;
  }

  return (
    <button onClick={props.onClick} className={className}>
      {props.children}
    </button>
  );
}
