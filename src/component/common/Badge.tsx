import {PropsWithChildren} from "react";

export function Badge(props: PropsWithChildren<{
  className?: string

}>) {
  let className = "inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-700/10 ring-inset"
  if (props.className) {
    className += ' ' + props.className
  }
  return <span
    className={className}
  >
    {props.children}
  </span>
}