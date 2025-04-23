import {PropsWithChildren} from "react";

export function Hint(props: PropsWithChildren<{}>) {
  return <span className="text-slate-300">{props.children}</span>
}
