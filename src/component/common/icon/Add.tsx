import {PlusSquare} from "react-feather";

export function Add(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <PlusSquare className={className} size="16"/>
}