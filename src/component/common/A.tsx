import {PropsWithChildren} from "react";

export function A(props: PropsWithChildren<{
  href: string,
  className?: string
}>) {
  return <a
    href={props.href}
    className={["font-medium text-sky-800 dark:text-sky-700 hover:underline", props.className].join(' ')}
    target="_blank"
  >
    {props.children}
  </a>


}