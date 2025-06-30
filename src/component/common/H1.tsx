import {PropsWithChildren} from "react";

export function H1(props: PropsWithChildren<{}>) {
  return <h1 className="text-2xl font-bold text-gray-900 mb-5">{props.children}</h1>
}