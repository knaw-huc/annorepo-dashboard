import { X } from "react-feather";

export function Close(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <X className={className} size="16" />;
}
