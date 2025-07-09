import {PropsWithChildren} from "react";

export function H5(props: PropsWithChildren<{}>) {
  return <h5
    className="mt-2 text-l font-medium text-center w-full"
  >
    {props.children}
  </h5>
}