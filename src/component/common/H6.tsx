import {PropsWithChildren} from "react";

export function H6(props: PropsWithChildren<{
  className?: string
  onClick?: () => void
}>) {
  let className = 'mt-2 mb-2 text-l font-medium leading-tight'
  if(props.className) {
    className += ` ${props.className}`
  }
  return <h6
    onClick={props.onClick}
    className={className}
  >
    {props.children}
  </h6>
}