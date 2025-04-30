import {PropsWithChildren} from "react";

export function H5(props: PropsWithChildren<{}>) {
  return <h5
    className="mt-2 text-l font-medium leading-tight text-center"
  >
    {props.children}
  </h5>
}