import {Save} from "react-feather";

export function Store(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <Save className={className} size="16"/>
}