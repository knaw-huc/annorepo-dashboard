import { PropsWithChildren } from "react";

export function NeutralButton(
  props: PropsWithChildren<{
    onClick: () => void;
  }>,
) {
  return (
    <button
      onClick={props.onClick}
      className="bg-neutral-100 rounded-full border border-neutral-200 px-3 py-1 text-sm cursor-pointer hover:bg-neutral-50 hover:border-neutral-400 transition text-neutral-800"
    >
      {props.children}
    </button>
  );
}
