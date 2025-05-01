import {PropsWithChildren} from "react";

export function Warning(props: PropsWithChildren<{
  className?: string,

}>) {
  let className = 'px-5 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
  if (props.className) {
    className += ` ${props.className}`
  }
  return <div
    className={className}
    role="alert"
  >
    {props.children}
  </div>
}