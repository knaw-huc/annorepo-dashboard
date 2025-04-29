import {PropsWithChildren} from "react";

export function ListGroup(props: PropsWithChildren<{}>) {
  return <ul
    className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  >
    {props.children}
  </ul>
}

export function ListItem(props: PropsWithChildren<{
  isLast: boolean
}>) {
  const itemClassNames = `w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600`;
  const lastItemClassNames = `w-full px-4 py-2 rounded-b-lg`

  return <li
    className={props.isLast ? lastItemClassNames : itemClassNames}
  >
    {props.children}
  </li>
}
