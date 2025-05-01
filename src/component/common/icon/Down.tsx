import {ChevronDown} from "react-feather";

export function Down(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <ChevronDown className={className} size="16"/>
}