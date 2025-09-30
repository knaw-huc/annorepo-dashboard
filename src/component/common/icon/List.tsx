import { List as FeatherList } from "react-feather";

export function List(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <FeatherList className={className} size="16" />;
}
