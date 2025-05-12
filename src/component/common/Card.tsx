import {PropsWithChildren, ReactNode} from "react";

export function Card(props: PropsWithChildren<{
  header?: ReactNode
  footer?: ReactNode
}>) {
  return <div
    className="mt-3 block rounded-lg bg-slate-50 text-surface shadow-secondary-1">
    {props.header && <div
      className="border-b-2 border-neutral-100 px-6 py-3"
    >
      {props.header}
    </div>}
    <div className=" px-6 py-3 overflow-scroll">
      {props.children}
    </div>
    {props.footer && <div
      className="border-t-2 border-neutral-100 px-6 py-3 text-surface/75"
    >
      {props.footer}
    </div>}
  </div>
}