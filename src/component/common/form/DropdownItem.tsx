export function DropdownItem(props: {
  label: string
  onClick: () => void
}) {
  return <li
    onClick={props.onClick}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
  >
    {props.label}
  </li>
}