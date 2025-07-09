import {Square} from "react-feather";

export function Unchecked(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <Square className={className} size="16"/>
}