import { Lock as FeatherLock } from "react-feather";

export function Lock(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <FeatherLock className={className} size="16" />;
}
