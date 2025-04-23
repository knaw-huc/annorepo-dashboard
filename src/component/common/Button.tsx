import {PropsWithChildren} from "react";

export function Button(props: PropsWithChildren<{label: string, onSubmit: () => void}>) {
  return <button
    type="button"
    onClick={props.onSubmit}
    className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >{props.label}</button>
}
