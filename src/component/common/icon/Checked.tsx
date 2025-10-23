import { CheckSquare } from "react-feather";

export function Checked(props: { className?: string; size?: string | number }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <CheckSquare className={className} size={props.size ?? 16} />;
}
