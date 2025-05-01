import {ChevronRight} from "react-feather";

export function Next(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <ChevronRight className={className} size="16"/>
}