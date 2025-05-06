import {PropsWithChildren} from "react";

export function Button(props: PropsWithChildren<{
  fullWidth?: boolean
  onClick: () => void
  disabled?: boolean,
  className?: string
  type?: 'button' | 'submit'
}>) {
  let classNames = `justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs border-b-2`
  if (props.fullWidth) {
    classNames += ' flex w-full'
  }
  if (props.disabled) {
    classNames += ' bg-slate-300 hover:bg-slate-300 border-slate-400'
  } else {
    classNames += ' cursor-pointer bg-slate-600 border-slate-800 hover:bg-slate-500 hover:border-slate-700'
  }
  if(props.className) {
    classNames += ' ' + props.className
  }
  return <button
    disabled={props.disabled}
    type={props.type || 'button'}
    onClick={props.onClick}
    className={classNames}
  >
    {props.children}
  </button>
}
