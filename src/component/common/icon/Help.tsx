import {HelpCircle} from "react-feather";

export function Help(props: { className?: string }) {
  let className = "inline";

  if (props.className) className += ` ${props.className}`;

  return <HelpCircle className={className} size="16"/>
}