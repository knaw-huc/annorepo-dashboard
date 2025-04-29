import {PropsWithChildren} from "react";

export function Badge(props: PropsWithChildren<{}>) {
  return <span
    className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-700/10 ring-inset"
  >
    {props.children}
  </span>
}