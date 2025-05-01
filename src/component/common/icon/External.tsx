import {ExternalLink} from "react-feather";

export function External(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <ExternalLink className={className} size="16"/>
}