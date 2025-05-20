import {PropsWithChildren} from "react";

export function Button(props: PropsWithChildren<{
  fullWidth?: boolean
  onClick: () => void
  disabled?: boolean,
  className?: string
  type?: 'button' | 'submit'
  secondary?: boolean
}>) {
  let classNames = `justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs`
  if (props.fullWidth) {
    classNames += ' flex w-full'
  }

  if(props.secondary) {
    classNames += ' cursor-pointer bg-slate-100 hover:bg-slate-100 hover:border-slate-100 text-slate-700 border-1 border-solid hover:border-slate-400 border-b-slate-700'
  } else if (props.disabled) {
    classNames += ' cursor-not-allowed bg-slate-300 hover:bg-slate-300 border-slate-400 text-white'
  } else {
    classNames += ' cursor-pointer bg-slate-600 border-slate-800 hover:bg-slate-500 hover:border-black text-white'
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
