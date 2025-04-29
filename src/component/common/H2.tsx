import {PropsWithChildren} from "react";

export function H2(props: PropsWithChildren<{}>) {
  return <h2 className="text-xl font-bold text-gray-900">{props.children}</h2>
}