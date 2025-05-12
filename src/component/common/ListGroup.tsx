import {PropsWithChildren, ReactNode} from "react";

export function ListGroup(props: { children: Iterable<ReactNode> }) {
  if (!Array.from(props.children).length) {
    return null;
  }
  return <ul
    className="mt-3 w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
  >
    {props.children}
  </ul>
}

export function ListItem(props: PropsWithChildren<{
  isLast: boolean
}>) {
  const itemClassNames = `w-full px-4 py-2 border-b border-gray-200 rounded-t-lg`;
  const lastItemClassNames = `w-full px-4 py-2 rounded-b-lg`

  return <li
    className={props.isLast ? lastItemClassNames : itemClassNames}
  >
    {props.children}
  </li>
}
