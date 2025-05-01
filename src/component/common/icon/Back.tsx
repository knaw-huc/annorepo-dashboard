import {ChevronLeft} from "react-feather";

export function Back(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <ChevronLeft className={className} size="16"/>
}