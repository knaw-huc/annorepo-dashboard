import {CheckSquare} from "react-feather";

export function Checked(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <CheckSquare className={className} size="16"/>
}