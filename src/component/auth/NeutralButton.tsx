import { PropsWithChildren } from "react";

export function NeutralButton(
  props: PropsWithChildren<{
    onClick: () => void;
    className?: string;
  }>,
) {
  let className =
    "bg-neutral-100 rounded-full border border-neutral-200 px-3 py-1 text-sm cursor-pointer hover:bg-neutral-50 hover:border-neutral-400 transition text-neutral-800";
  if (props.className) {
    className += " " + props.className;
  }
  return (
    <button onClick={props.onClick} className={className}>
      {props.children}
    </button>
  );
}
