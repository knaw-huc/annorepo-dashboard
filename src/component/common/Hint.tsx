import {PropsWithChildren} from "react";

export function Hint(props: PropsWithChildren<{}>) {
  return <span className="ml-1 text-slate-300">{props.children}</span>
}
