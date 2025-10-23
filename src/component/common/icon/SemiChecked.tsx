import { MinusSquare } from "react-feather";

export function SemiChecked(props: {
  className?: string;
  size?: string | number;
}) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <MinusSquare className={className} size={props.size ?? 16} />;
}
