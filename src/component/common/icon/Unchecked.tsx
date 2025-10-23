import { Square } from "react-feather";

export function Unchecked(props: {
  className?: string;
  size?: string | number;
}) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <Square className={className} size={props.size ?? 16} />;
}
