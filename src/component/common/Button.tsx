import {PropsWithChildren} from "react";

export function Button(props: PropsWithChildren<{
  fullWidth?: boolean
  onClick: () => void
  disabled?: boolean,
  className?: string
}>) {
  console.log('Button', props)
  let classNames = `justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600`
  if (props.fullWidth) {
    classNames += ' flex w-full'
  }
  if (props.disabled) {
    classNames += ' bg-slate-300 hover:bg-slate-300'
  } else {
    classNames += ' bg-slate-600 hover:bg-slate-500 cursor-pointer'
  }
  if(props.className) {
    classNames += ' ' + props.className
  }
  return <button
    disabled={props.disabled}
    type="button"
    onClick={props.onClick}
    className={classNames}
  >
    {props.children}
  </button>
}
