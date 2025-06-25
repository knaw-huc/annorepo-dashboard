import {PropsWithChildren} from "react";
import "./Tooltip.css"

export function Tooltip(props: PropsWithChildren<{ text: string }>) {
  return <span className="with-tooltip">
      <span
        className="tooltip rounded min-w-50 max-w-100 mt-7 pt-2 pb-3 px-2 bg-slate-700 text-gray-100 text-sm font-medium"
      >
        {props.text}
      </span>
    {props.children}
  </span>
}