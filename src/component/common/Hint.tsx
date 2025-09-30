import { PropsWithChildren } from "react";

export function Hint(props: PropsWithChildren<object>) {
  return <span className="ml-1 text-slate-400">{props.children}</span>;
}
