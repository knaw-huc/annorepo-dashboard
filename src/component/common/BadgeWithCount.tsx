import {PropsWithChildren} from "react";

export function BadgeWithCount(props: PropsWithChildren<{
  count: number
}>) {
  return <span
    className="inline-block mr-2 mb-2 pb-1 pt-0.5 pl-2 pr-1 leading-tight border border-gray-200 rounded-lg bg-slate-50"
  >
    <span className="text-xs">{props.children}</span>
    <span
      className="rounded-md bg-slate-400 ml-2 py-0.5 px-1 text-center text-xs"
      title={`${props.count} annotations contain field ${props.children?.toString()}`}
    >
        <span
          className="font-bold text-white"
        >
          {props.count}
        </span>
    </span>
  </span>
}