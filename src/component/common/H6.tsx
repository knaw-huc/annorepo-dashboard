import {PropsWithChildren} from "react";

export function H6(props: PropsWithChildren<{
  onClick?: () => void
}>) {
  return <h6
    onClick={props.onClick}
    className="mt-2 mb-2 text-l font-medium leading-tight"
  >
    {props.children}
  </h6>
}