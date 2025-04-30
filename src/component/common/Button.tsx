import {PropsWithChildren} from "react";

export function Button(props: PropsWithChildren<{
  fullWidth?: boolean
  onClick: () => void
}>) {
  return <button
    type="button"
    onClick={props.onClick}
    className={`${props.fullWidth ? 'flex w-full' : ''} justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
  >{props.children}</button>
}
