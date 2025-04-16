import {PropsWithChildren} from "react";

export function H1(props: PropsWithChildren<{}>) {
  return <h1 className="text-4xl font-bold text-gray-900">{props.children}</h1>
}