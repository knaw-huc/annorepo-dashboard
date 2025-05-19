import {Trash2} from "react-feather";

export function Remove(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <Trash2 className={className} size="16"/>
}