import { PropsWithChildren, ReactNode } from "react";

export function Label(
  props: PropsWithChildren<{
    text: ReactNode;
    error?: string;
    htmlFor: string;
  }>,
) {
  let labelClassname = "text-sm italic";
  if (props.error) {
    labelClassname += " text-red-400";
  } else {
    labelClassname += " text-anrep-pink-600";
  }
  const label = props.error ? `${props.text}: ${props.error}` : props.text;

  return (
    <label htmlFor={props.htmlFor} className={labelClassname}>
      {label}
    </label>
  );
}
