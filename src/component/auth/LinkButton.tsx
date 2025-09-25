import { PropsWithChildren } from "react";

export function LinkButton(
  props: PropsWithChildren<{
    onClick: () => void;
  }>,
) {
  return (
    <button
      onClick={props.onClick}
      className="underline hover:text-slate-900 cursor-pointer"
    >
      {props.children}
    </button>
  );
}
